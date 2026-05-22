/******************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento, manipulação de dados.
 * Data: 17/04/2026
 * Autor: Gisele
 * Versão: 1.0
 ******************************************************************************************/ 
//Import do arquivo de configurações de mensagens de projeto
const configMessages = require ('../modulo/configMessages.js')

//Import do arquivo do DAO para manipular os dados de filme no Banco de Dados
const filmeDAO = require('../../model/DAO/filme/filme.js')

//Import das Controllers
const controllerClassificacao = require('../classificacao/controller_classificacao.js')
//Função para inserir um novo filme
const controllerFilmeGenero = require('./controller_filme_genero.js')

const inserirNovoFilme = async function (filme, contentType){

    //Cria uma cópia dos JSON do arquivo de configuração (converte pra string e depois pra JSON novamente)
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){

            //Chama a função para validar a entrada dos dados do filme
            let validar = await validarDados(filme)
        
            //Retorna um JSON de erro caso algum atributo seja invalido
            //senão retorna um false
            if(validar){
                return validar //400
            }else{
                //Encaminha os dados do Filme para o DAO inserir no BD
                let result = await filmeDAO.insertFilme(await tratarDados(filme))
                
                console.log(result)
        
                if(result){//201
                    //Cria o ID no JSON do filme e adiciona o ID gerado no DAO
                    filme.id = result 

                    //Percorre o array de generos que chegará na
                    // requisição pelo objeto Filme
                    for (itemFilme of filme.genero) {
                        //Manipulação de dados para Inserir os Generos relacionados ao Filme
                        let filmeGenero = {
                            "id_filme": filme.id,
                            "id_genero": itemFilme.id
                        }
                        let resultFilmeGenero = await controllerFilmeGenero.inserirNovoFilmeGenero(filmeGenero)
                        console.log(resultFilmeGenero)
                    }
                    
                   

                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_CREATED_ITEM.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_CREATED_ITEM.status_code
                    customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_CREATED_ITEM.message
                    customMessage.DEFAULT_MESSAGE.response = filme 

                    return customMessage.DEFAULT_MESSAGE
        
                }else{ //erro 500(Model)
                    return customMessage.ERROR_INTERNAL_SERVER_MODEL //500
                }
            }
            
            }else{
                return customMessage.ERROR_CONTENT_TYPE //415
            }
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER //500 (controller)
    }


}

//Função para atualizar um filme existente 
const atualizarFilme = async function(filme,id,contentType){
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        //validação para verificar se o conteúdo do Body é um JSON
        if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){
            
            //Chama a função para buscar o filme e validar se o ID esta correto,
            //Se o ID existe no BD e se o filme existe
            let resultBuscarFilme = await buscarFilme(id)

            if(resultBuscarFilme.status){
                //Chama a função para validar os dados para alteração do filme (Body)
                let validar = await validarDados(filme) 

                if(!validar){
                    //Adiciona um atributo ID no JSON de filme, para enviar ao DAO um único objeto
                    filme.id = Number(id)
                    //Chama a função para atualizar o filme no BD
                    let result = await filmeDAO.updateFilme(await tratarDados(filme))

                    if(result){
                        customMessage.DEFAULT_MESSAGE.status        = customMessage.SUCCESS_UPDATED_ITEM.status
                        customMessage.DEFAULT_MESSAGE.status_code   = customMessage.SUCCESS_UPDATED_ITEM.status_code
                        customMessage.DEFAULT_MESSAGE.message       = customMessage.SUCCESS_UPDATED_ITEM.message
                        customMessage.DEFAULT_MESSAGE.response      = filme
                        return customMessage.DEFAULT_MESSAGE //200 (Atualizado)


                    }else{
                        return customMessage.ERROR_INTERNAL_SERVER_MODEL //500 -> erro na Model
                    }
                }else{
                    return validar //400 de validação dos campos do banco de dados
                }

            }else{
                return resultBuscarFilme //vai devolver um 400(ID inválido), 404(Não encontrado) ou 500(erro Controller ou DAO)
            }

        }else{
            return customMessage.ERROR_CONTENT_TYPE // 415 - erro: tipo de dados inválido
        }
    } catch (error) {

        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER // 500 - controller 
    }

}

//Função para retornar todos os filmes existentes
const listarFilmes = async function(){
    //Cria uma cópia dos JSON do arquivo de configuração (converte pra string e depois pra JSON novamente)
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        //Chama a função do DAO para retornar a lista de filmes do BD
        let result = await filmeDAO.selectAllFilme()

        //Validação para verificar se o DAO conseguiu processar o script no BD
        if(result){

            //Validação para verificar se o conteúdo do array tem dados de retorno
            //Ou se está vazio
            if(result.length > 0){


                //Manipulação dos dados da Classificação
                //Percorre o array de filmes
                for (filme of result){
                    //Busca na controller da classificação o ID referente a FK da classificacao
                    let resultClassificacao = await controllerClassificacao.buscarClassificacao(filme.id_classificacao)
                    
                    //Se encontrar o ID
                    if(resultClassificacao.status){

                        //Adicionar um atributo classificacao no JSON do filme e colocar o resultado com os dados da classificação
                        filme.classificacao = resultClassificacao.response.classificacao
                        //Apaga o id da classificação do JSON do filme
                        delete filme.id_classificacao
                    }
                }


                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status 
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                customMessage.DEFAULT_MESSAGE.response.count = result.length
                //Cria um atributo filme e manda nele o array de filmes pra dentro do response
                customMessage.DEFAULT_MESSAGE.response.filme = result 

                return customMessage.DEFAULT_MESSAGE
            }else{
                return customMessage.ERROR_NOT_FOUND //404
            }
        }else{
            return customMessage.ERROR_INTERNAL_SERVER_MODEL
        }
    } catch (error) {
        console.log(error)
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER //500 (controller)
    }
}

//Função para retornar um filme filtrando pelo ID
const buscarFilme = async function(id){
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        //Validação para garantir que o ID seja um número válido
        if(id == undefined || String(id).replaceAll(' ', '') == '' ||id == '' || id == null || isNaN(id) || id <= 0){
            customMessage.ERROR_BAD_REQUEST.field = `[ID] INVÁLIDO.`
            return customMessage.ERROR_BAD_REQUEST //400
        }else{
            //Chama a função do DAO para pesquisar o filme pelo ID
            let result = await filmeDAO.selectByIdFilme(id)

            //Validação para verificar se o DAO retornou dados ou um FALSE(erro)
            if(result){
                //Validação para verificar se o DAO tem algum dado no Array
                if(result.length > 0){
                    customMessage.DEFAULT_MESSAGE.status            = customMessage.SUCCESS_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code       = customMessage.SUCCESS_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.filme    = result

                    return customMessage.DEFAULT_MESSAGE //200

                }else{
                    return customMessage.ERROR_NOT_FOUND //404
                }
            }else{
                return customMessage.ERROR_INTERNAL_SERVER_MODEL //500 (model)
            }
        }
    } catch (error) {
        console.log(error)
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER //500
        
    }
}

//Função para excluir um filme
const excluirFilme = async function(id){
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {

        let resultBuscarFilme = await buscarFilme(id)

        if(resultBuscarFilme.status){
            let result = await filmeDAO.deleteFilme(id)

            if(result){
                return customMessage.SUCCESS_DELETED_ITEM
            }else{
                return customMessage.ERROR_INTERNAL_SERVER_MODEL
            }
        }else{
            return resultBuscarFilme 
        }

    } catch (error) {
        console.log(error)
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Função para validar os dados de cadastro do Filme
const validarDados = async function(filme){

    let customMessage = JSON.parse(JSON.stringify(configMessages))

    if(filme.nome == undefined ||filme.nome == '' || filme.nome == null||filme.nome.length > 80){
        customMessage.ERROR_BAD_REQUEST.field = '[NOME] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST
    }else if(filme.nome == undefined || filme.sinopse == ''|| filme.sinopse == null){
        customMessage.ERROR_BAD_REQUEST.field = '[SINOPSE] INVÁLIDA'
        return customMessage.ERROR_BAD_REQUEST
    }else if(filme.capa == undefined ||filme.capa == '' || filme.capa == null ||  filme.capa.length > 255){
        customMessage.ERROR_BAD_REQUEST.field = '[CAPA] INVÁLIDA'
        return customMessage.ERROR_BAD_REQUEST
    }else if(filme.data_lancamento == undefined || filme.data_lancamento == '' || filme.data_lancamento == null ||  filme.data_lancamento.length != 10){
        customMessage.ERROR_BAD_REQUEST.field = '[DATA DE LANÇAMENTO] INVÁLIDA'
        return customMessage.ERROR_BAD_REQUEST
    }else if(filme.duracao == undefined || filme.duracao == '' || filme.duracao == null ||  filme.duracao.length < 5){
        customMessage.ERROR_BAD_REQUEST.field = '[DURAÇÃO] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST
    }else if(filme.valor == undefined || isNaN(filme.valor) || filme.valor.length > 5){
        customMessage.ERROR_BAD_REQUEST.field = '[VALOR] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST
    }else if(filme.avaliacao == undefined ||isNaN(filme.avaliacao)|| filme.avaliacao.length > 3){
        customMessage.ERROR_BAD_REQUEST.field = '[AVALIAÇÃO] INVÁLIDA'
        return customMessage.ERROR_BAD_REQUEST
    
    //Validação para a FK da classificação
    }else if(filme.id_classificacao == undefined || filme.id_classificacao == '' || filme.id_classificacao == null || isNaN(filme.id_classificacao)|| filme.id_classificacao <= 0){
        customMessage.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST
    }else{
        return false
    }
}

const tratarDados = async function(filme){
    //Tratamento para eliminar a chegada de aspas (') como caracter inválido
    filme.nome              =           filme.nome.replaceAll("'", "")
    filme.sinopse           =           filme.sinopse.replaceAll("'", "")
    filme.capa              =           filme.capa.replaceAll("'", "")
    filme.data_lancamento   =           filme.data_lancamento.replaceAll("'", "")
    filme.duracao           =           filme.duracao.replaceAll("'", "")
    filme.valor             =           filme.valor.replaceAll("'", "")
    filme.avaliacao         =           filme.avaliacao.replaceAll("'", "")
    
    return filme
}
module.exports = {
    inserirNovoFilme,
    atualizarFilme,
    listarFilmes,
    buscarFilme,
    excluirFilme,
    tratarDados
}