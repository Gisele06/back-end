/******************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento e manipulação de dados da Pessoa
 * Data: 18/05/2026
 * Autor: Gisele
 * Versão: 1.0
 ******************************************************************************************/

const configMessages = require('../modulo/configMessages.js')

const pessoaDAO = require('../../model/DAO/pessoa/pessoa.js')

const inserirNovaPessoa = async function(pessoa, contentType){

    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {

        if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){

            let validar = await validarDados(pessoa)

            if(validar){
                return validar
            }else{

                let result = await pessoaDAO.insertPessoa(await tratarDados(pessoa))

                if(result){

                    pessoa.id = result

                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_CREATED_ITEM.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_CREATED_ITEM.status_code
                    customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_CREATED_ITEM.message
                    customMessage.DEFAULT_MESSAGE.response = pessoa

                    return customMessage.DEFAULT_MESSAGE

                }else{
                    return customMessage.ERROR_INTERNAL_SERVER_MODEL
                }
            }

        }else{
            return customMessage.ERROR_CONTENT_TYPE
        }

    } catch (error) {
        console.log(error)
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const atualizarPessoa = async function(pessoa, id, contentType){

    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {

        if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){

            let resultBuscarPessoa = await buscarPessoa(id)

            if(resultBuscarPessoa.status){

                let validar = await validarDados(pessoa)

                if(!validar){

                    pessoa.id = Number(id)

                    let result = await pessoaDAO.updatePessoa(await tratarDados(pessoa))

                    if(result){

                        customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_UPDATED_ITEM.status
                        customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_UPDATED_ITEM.status_code
                        customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_UPDATED_ITEM.message
                        customMessage.DEFAULT_MESSAGE.response = pessoa

                        return customMessage.DEFAULT_MESSAGE

                    }else{
                        return customMessage.ERROR_INTERNAL_SERVER_MODEL
                    }

                }else{
                    return validar
                }

            }else{
                return resultBuscarPessoa
            }

        }else{
            return customMessage.ERROR_CONTENT_TYPE
        }

    } catch (error) {
        console.log(error)
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const listarPessoa = async function(){

    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {

        let result = await pessoaDAO.selectAllPessoa()

        if(result){

            if(result.length > 0){

                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                customMessage.DEFAULT_MESSAGE.response.count = result.length
                customMessage.DEFAULT_MESSAGE.response.pessoas = result

                return customMessage.DEFAULT_MESSAGE

            }else{
                return customMessage.ERROR_NOT_FOUND
            }

        }else{
            return customMessage.ERROR_INTERNAL_SERVER_MODEL
        }

    } catch (error) {
        console.log(error)
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const buscarPessoa = async function(id){

    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {

        if(id == undefined || isNaN(id) || id <= 0){

            customMessage.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'
            return customMessage.ERROR_BAD_REQUEST

        }else{

            let result = await pessoaDAO.selectByIdPessoa(id)

            if(result){

                if(result.length > 0){

                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.pessoa = result

                    return customMessage.DEFAULT_MESSAGE

                }else{
                    return customMessage.ERROR_NOT_FOUND
                }

            }else{
                return customMessage.ERROR_INTERNAL_SERVER_MODEL
            }
        }

    } catch (error) {
        console.log(error)
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const excluirPessoa = async function(id){

    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {

        let resultBuscarPessoa = await buscarPessoa(id)

        if(resultBuscarPessoa.status){

            let result = await pessoaDAO.deletePessoa(id)

            if(result){
                return customMessage.SUCCESS_DELETED_ITEM
            }else{
                return customMessage.ERROR_INTERNAL_SERVER_MODEL
            }

        }else{
            return resultBuscarPessoa
        }

    } catch (error) {
        console.log(error)
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const validarDados = async function(pessoa){

    let customMessage = JSON.parse(JSON.stringify(configMessages))

    if(pessoa.nome == undefined || pessoa.nome == '' || pessoa.nome == null || pessoa.nome.length > 100){

        customMessage.ERROR_BAD_REQUEST.field = '[NOME] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST //400

    }else if(pessoa.nome_completo == undefined || pessoa.nome_completo == '' || pessoa.nome_completo == null || pessoa.nome_completo.length > 100){

        customMessage.ERROR_BAD_REQUEST.field = '[NOME COMPLETO] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST //400

    }else if(pessoa.biografia == undefined || pessoa.biografia == '' || pessoa.biografia == null){

        customMessage.ERROR_BAD_REQUEST.field = '[BIOGRAFIA] INVÁLIDA'
        return customMessage.ERROR_BAD_REQUEST //400

    }else if(pessoa.url_foto == undefined || pessoa.url_foto == '' || pessoa.url_foto == null || pessoa.url_foto.length > 255){

        customMessage.ERROR_BAD_REQUEST.field = '[URL FOTO] INVÁLIDA'
        return customMessage.ERROR_BAD_REQUEST //400

    }else if(pessoa.idade == undefined || pessoa.idade == '' || pessoa.idade == null || isNaN(pessoa.idade) || pessoa.idade < 0){

        customMessage.ERROR_BAD_REQUEST.field = '[IDADE] INVÁLIDA'
        return customMessage.ERROR_BAD_REQUEST //400

    }else if(pessoa.data_nascimento == undefined || pessoa.data_nascimento == '' || pessoa.data_nascimento == null){

        customMessage.ERROR_BAD_REQUEST.field = '[DATA NASCIMENTO] INVÁLIDA'
        return customMessage.ERROR_BAD_REQUEST //400

    }else if(pessoa.anos_de_carreira == undefined || pessoa.anos_de_carreira == '' || pessoa.anos_de_carreira == null || isNaN(pessoa.anos_de_carreira) || pessoa.anos_de_carreira < 0){

        customMessage.ERROR_BAD_REQUEST.field = '[ANOS DE CARREIRA] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST //400

    }else if(pessoa.quantidade_filmes_feitos == undefined || pessoa.quantidade_filmes_feitos == '' || pessoa.quantidade_filmes_feitos == null || isNaN(pessoa.quantidade_filmes_feitos) || pessoa.quantidade_filmes_feitos < 0){

        customMessage.ERROR_BAD_REQUEST.field = '[QUANTIDADE FILMES FEITOS] INVÁLIDA'
        return customMessage.ERROR_BAD_REQUEST //400

    }else{
        return false
    }
}

const tratarDados = async function(pessoa){

    pessoa.nome = pessoa.nome.replaceAll("'", "")
    pessoa.nome_completo = pessoa.nome_completo.replaceAll("'", "")
    pessoa.biografia = pessoa.biografia.replaceAll("'", "")

    return pessoa
}

module.exports = {
    inserirNovaPessoa,
    atualizarPessoa,
    listarPessoa,
    buscarPessoa,
    excluirPessoa
}