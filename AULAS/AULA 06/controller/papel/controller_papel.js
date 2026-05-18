/******************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento e manipulação de dados de papel
 * Data: 18/05/2026
 * Autor: Gisele
 * Versão: 1.0
 ******************************************************************************************/

const configMessages = require('../modulo/configMessages.js')

const papelDAO = require('../../model/DAO/papel/papel.js')

const inserirNovoPapel = async function(papel, contentType){

    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {

        if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){

            let validar = await validarDados(papel)

            if(validar){
                return validar
            }else{

                let result = await papelDAO.insertPapel(await tratarDados(papel))

                if(result){

                    papel.id = result

                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_CREATED_ITEM.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_CREATED_ITEM.status_code
                    customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_CREATED_ITEM.message
                    customMessage.DEFAULT_MESSAGE.response = papel

                    return customMessage.DEFAULT_MESSAGE

                }else{
                    return customMessage.ERROR_INTERNAL_SERVER_MODEL //500(model)
                }
            }

        }else{
            return customMessage.ERROR_CONTENT_TYPE //415
        }

    } catch (error) {
        console.log(error)
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER //500(controller)
    }
}

const atualizarPapel = async function(papel, id, contentType){

    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {

        if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){

            let resultBuscarPapel = await buscarPapel(id)

            if(resultBuscarPapel.status){

                let validar = await validarDados(papel)

                if(!validar){

                    papel.id = Number(id)

                    let result = await papelDAO.updatePapel(await tratarDados(papel))

                    if(result){

                        customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_UPDATED_ITEM.status
                        customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_UPDATED_ITEM.status_code
                        customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_UPDATED_ITEM.message
                        customMessage.DEFAULT_MESSAGE.response = papel

                        return customMessage.DEFAULT_MESSAGE

                    }else{
                        return customMessage.ERROR_INTERNAL_SERVER_MODEL //500(model)
                    }

                }else{
                    return validar //400
                }

            }else{
                return resultBuscarPapel //404
            }

        }else{
            return customMessage.ERROR_CONTENT_TYPE //415
        }

    } catch (error) {
        console.log(error)
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER //500(controller)
    }
}

const listarPapel = async function(){

    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {

        let result = await papelDAO.selectAllPapel()

        if(result){

            if(result.length > 0){

                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                customMessage.DEFAULT_MESSAGE.response.count = result.length
                customMessage.DEFAULT_MESSAGE.response.papeis = result

                return customMessage.DEFAULT_MESSAGE

            }else{
                return customMessage.ERROR_NOT_FOUND //404
            }

        }else{
            return customMessage.ERROR_INTERNAL_SERVER_MODEL //500(model)
        }

    } catch (error) {
        console.log(error)
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER //500(controller)
    }
}

const buscarPapel = async function(id){

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

            let result = await papelDAO.selectByIdPapel(id)

            if(result){

                if(result.length > 0){

                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.papel = result

                    return customMessage.DEFAULT_MESSAGE

                }else{
                    return customMessage.ERROR_NOT_FOUND //404
                }

            }else{
                return customMessage.ERROR_INTERNAL_SERVER_MODEL //500(model)
            }
        }

    } catch (error) {
        console.log(error)
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER //500(controller)
    }
}

const excluirPapel = async function(id){

    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {

        let resultBuscarPapel = await buscarPapel(id)

        if(resultBuscarPapel.status){

            let result = await papelDAO.deletePapel(id)

            if(result){
                return customMessage.SUCCESS_DELETED_ITEM //200
            }else{
                return customMessage.ERROR_INTERNAL_SERVER_MODEL //500(model)
            }

        }else{
            return resultBuscarPapel //404
        }

    } catch (error) {
        console.log(error)
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER //500(controller)
    }
}

const validarDados = async function(papel){

    let customMessage = JSON.parse(JSON.stringify(configMessages))

    if(papel.papel == undefined || papel.papel == '' || papel.papel == null || papel.papel.length > 50){

        customMessage.ERROR_BAD_REQUEST.field = '[PAPEL] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST //400

    }else{
        return false
    }
}

const tratarDados = async function(papel){

    papel.papel = papel.papel.replaceAll("'", "")

    return papel
}

module.exports = {
    inserirNovoPapel,
    atualizarPapel,
    listarPapel,
    buscarPapel,
    excluirPapel
}