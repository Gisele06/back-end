/******************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento e manipulação de dados de classificação
 * Data: 15/05/2026
 * Autor: Gisele
 * Versão: 1.0
 ******************************************************************************************/

const configMessages = require('../modulo/configMessages.js')

const classificacaoDAO = require('../../model/DAO/classificacao/classificacao.js')

const inserirNovaClassificacao = async function(classificacao, contentType){

    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {

        if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){

            let validar = await validarDados(classificacao)

            if(validar){
                return validar
            }else{

                let result = await classificacaoDAO.insertClassificacao(await tratarDados(classificacao))

                if(result){

                    classificacao.id = result

                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_CREATED_ITEM.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_CREATED_ITEM.status_code
                    customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_CREATED_ITEM.message
                    customMessage.DEFAULT_MESSAGE.response = classificacao

                    return customMessage.DEFAULT_MESSAGE

                }else{
                    return customMessage.ERROR_INTERNAL_SERVER_MODEL //500(model)
                }
            }

        }else{
            return customMessage.ERROR_CONTENT_TYPE //415
        }

    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER //500(controller)
    }
}

const atualizarClassificacao = async function(classificacao, id, contentType){

    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {

        if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){

            let resultBuscarClassificacao = await buscarClassificacao(id)

            if(resultBuscarClassificacao.status){

                let validar = await validarDados(classificacao)

                if(!validar){

                    classificacao.id = Number(id)

                    let result = await classificacaoDAO.updateClassificacao(await tratarDados(classificacao))

                    if(result){

                        customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_UPDATED_ITEM.status
                        customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_UPDATED_ITEM.status_code
                        customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_UPDATED_ITEM.message
                        customMessage.DEFAULT_MESSAGE.response = classificacao

                        return customMessage.DEFAULT_MESSAGE

                    }else{
                        return customMessage.ERROR_INTERNAL_SERVER_MODEL //500(model)
                    }

                }else{
                    return validar //400
                }

            }else{
                return resultBuscarClassificacao //404
            }

        }else{
            return customMessage.ERROR_CONTENT_TYPE //415
        }

    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER //500(controller)
    }
}

const listarClassificacoes = async function(){

    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {

        let result = await classificacaoDAO.selectAllClassificacao()

        if(result){

            if(result.length > 0){

                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                customMessage.DEFAULT_MESSAGE.response.count = result.length
                customMessage.DEFAULT_MESSAGE.response.classificacoes = result

                return customMessage.DEFAULT_MESSAGE

            }else{
                return customMessage.ERROR_NOT_FOUND //404
            }

        }else{
            return customMessage.ERROR_INTERNAL_SERVER_MODEL //500(model)
        }

    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER //500(controller)
    }
}

const buscarClassificacao = async function(id){

    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {

        if(id == undefined || 
           String(id).replaceAll(' ','') == '' || 
           id == null || 
           isNaN(id) || 
           id <= 0){

            customMessage.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'
            return customMessage.ERROR_BAD_REQUEST //400

        }else{

            let result = await classificacaoDAO.selectByIdClassificacao(id)

            if(result){

                if(result.length > 0){

                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.classificacao = result

                    return customMessage.DEFAULT_MESSAGE

                }else{
                    return customMessage.ERROR_NOT_FOUND //404
                }

            }else{
                return customMessage.ERROR_INTERNAL_SERVER_MODEL //500(model)
            }
        }

    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER //500(controller)
    }
}

const excluirClassificacao = async function(id){

    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {

        let resultBuscarClassificacao = await buscarClassificacao(id)

        if(resultBuscarClassificacao.status){

            let result = await classificacaoDAO.deleteClassificacao(id)

            if(result){
                return customMessage.SUCCESS_DELETED_ITEM //200
            }else{
                return customMessage.ERROR_INTERNAL_SERVER_MODEL //500(model)
            }

        }else{
            return resultBuscarClassificacao //404
        }

    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER //500(controller)
    }
}

const validarDados = async function(classificacao){

    let customMessage = JSON.parse(JSON.stringify(configMessages))

    if(classificacao.sigla == undefined || classificacao.sigla == '' || classificacao.sigla == null || classificacao.sigla.length > 3){

        customMessage.ERROR_BAD_REQUEST.field = '[SIGLA] INVÁLIDA'
        return customMessage.ERROR_BAD_REQUEST //400
    }else if(classificacao.nome == undefined || classificacao.nome == ''||classificacao.nome == null|| classificacao.nome.length > 10){
        customMessage.ERROR_BAD_REQUEST.field = '[NOME] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST //400
    }else if(classificacao.descricao == undefined || classificacao.descricao == ''|| classificacao.descricao == null||classificacao.descricao.length > 50){
        customMessage.ERROR_BAD_REQUEST.field = '[DESCRICAO] INVÁLIDA'
        return customMessage.ERROR_BAD_REQUEST //400
    }else{
        return false
    }
}
const tratarDados = async function(classificacao){

    if (classificacao.sigla)
        classificacao.sigla = String(classificacao.sigla).replaceAll("'", "")

    if (classificacao.nome)
        classificacao.nome = String(classificacao.nome).replaceAll("'", "")

    if (classificacao.descricao)
        classificacao.descricao = String(classificacao.descricao).replaceAll("'", "")

    return classificacao
}
module.exports = {
    inserirNovaClassificacao,
    atualizarClassificacao,
    listarClassificacoes,
    buscarClassificacao,
    excluirClassificacao
}