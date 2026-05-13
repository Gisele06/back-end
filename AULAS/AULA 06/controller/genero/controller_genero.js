/******************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento e manipulação de dados de gênero
 * Data: 17/04/2026
 * Autor: Gisele
 * Versão: 1.0
 ******************************************************************************************/

const configMessages = require('../modulo/configMessages.js')

const generoDAO = require('../../model/DAO/genero/genero.js')

//Inserir gênero
const inserirNovoGenero = async function(genero, contentType){

    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {

        if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){

            let validar = await validarDados(genero)

            if(validar){
                return validar
            }else{

                let result = await generoDAO.insertGenero(await tratarDados(genero))

                if(result){

                    genero.id = result

                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_CREATED_ITEM.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_CREATED_ITEM.status_code
                    customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_CREATED_ITEM.message
                    customMessage.DEFAULT_MESSAGE.response = genero

                    return customMessage.DEFAULT_MESSAGE

                }else{
                    return customMessage.ERROR_INTERNAL_SERVER_MODEL
                }
            }

        }else{
            return customMessage.ERROR_CONTENT_TYPE
        }

    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

//Atualizar gênero
const atualizarGenero = async function(genero, id, contentType){

    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {

        if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){

            let resultBuscarGenero = await buscarGenero(id)

            if(resultBuscarGenero.status){

                let validar = await validarDados(genero)

                if(!validar){

                    genero.id = Number(id)

                    let result = await generoDAO.updateGenero(await tratarDados(genero))

                    if(result){

                        customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_UPDATED_ITEM.status
                        customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_UPDATED_ITEM.status_code
                        customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_UPDATED_ITEM.message
                        customMessage.DEFAULT_MESSAGE.response = genero

                        return customMessage.DEFAULT_MESSAGE

                    }else{
                        return customMessage.ERROR_INTERNAL_SERVER_MODEL
                    }

                }else{
                    return validar
                }

            }else{
                return resultBuscarGenero
            }

        }else{
            return customMessage.ERROR_CONTENT_TYPE
        }

    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

//Listar gêneros
const listarGenero = async function(){

    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {

        let result = await generoDAO.selectAllGenero()

        if(result){

            if(result.length > 0){

                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                customMessage.DEFAULT_MESSAGE.response.count = result.length
                customMessage.DEFAULT_MESSAGE.response.generos = result

                return customMessage.DEFAULT_MESSAGE

            }else{
                return customMessage.ERROR_NOT_FOUND
            }

        }else{
            return customMessage.ERROR_INTERNAL_SERVER_MODEL
        }

    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

//Buscar gênero 
const buscarGenero = async function(id){

    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {

        if(id == undefined || String(id).replaceAll(' ','') == '' || id == null || isNaN(id) || id <= 0){

            customMessage.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'
            return customMessage.ERROR_BAD_REQUEST

        }else{

            let result = await generoDAO.selectByIdGenero(id)

            if(result){

                if(result.length > 0){

                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.genero = result

                    return customMessage.DEFAULT_MESSAGE

                }else{
                    return customMessage.ERROR_NOT_FOUND
                }

            }else{
                return customMessage.ERROR_INTERNAL_SERVER_MODEL
            }
        }

    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

//Excluir gênero
const excluirGenero = async function(id){
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {

        let resultBuscarGenero = await buscarGenero(id)

        if(resultBuscarGenero.status){
            let result = await generoDAO.deleteGenero(id)

            if(result){
                return customMessage.SUCCESS_DELETED_ITEM
            }else{
                return customMessage.ERROR_INTERNAL_SERVER_MODEL
            }

        }else{
            return resultBuscarGenero
        }

    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

//Validar dados
const validarDados = async function(genero){

    let customMessage = JSON.parse(JSON.stringify(configMessages))

    if(genero.genero == undefined || genero.genero == '' || genero.genero == null || genero.genero.length > 15){
        customMessage.ERROR_BAD_REQUEST.field = '[GENERO] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST

    }else{
        return false
    }
}

//Tratar dados
const tratarDados = async function(genero){
    genero.genero = genero.genero.replaceAll("'", "")

    return genero
}

module.exports = {
    inserirNovoGenero,
    atualizarGenero,
    listarGenero,
    buscarGenero,
    excluirGenero,
    tratarDados
}