/******************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento e manipulação de dados de Trailer.
 * Data: 10/07/2026
 * Autor: Gisele
 * Versão: 1.0
 ******************************************************************************************/

const configMessages = require('../modulo/configMessages.js')
const trailerDAO = require('../../model/DAO/trailer/trailer.js')

const inserirNovoTrailer = async function(trailer, contentType) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            let validar = await validarDados(trailer)

            if (validar) {
                return validar
            } else {
                let result = await trailerDAO.insertTrailer(await tratarDados(trailer))

                if (result) {
                    trailer.id = result

                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_CREATED_ITEM.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_CREATED_ITEM.status_code
                    customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_CREATED_ITEM.message
                    customMessage.DEFAULT_MESSAGE.response = trailer

                    return customMessage.DEFAULT_MESSAGE
                } else {
                    return customMessage.ERROR_INTERNAL_SERVER_MODEL
                }
            }
        } else {
            return customMessage.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        console.log(error)
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const atualizarTrailer = async function(trailer, id, contentType) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            let resultBuscarID = await buscarTrailer(id)

            if (resultBuscarID.status) {
                let validar = await validarDados(trailer)

                if (!validar) {
                    trailer.id = Number(id)
                    let result = await trailerDAO.updateTrailer(await tratarDados(trailer))

                    if (result) {
                        customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_UPDATED_ITEM.status
                        customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_UPDATED_ITEM.status_code
                        customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_UPDATED_ITEM.message
                        customMessage.DEFAULT_MESSAGE.response = trailer

                        return customMessage.DEFAULT_MESSAGE
                    } else {
                        return customMessage.ERROR_INTERNAL_SERVER_MODEL
                    }
                } else {
                    return validar
                }
            } else {
                return resultBuscarID
            }
        } else {
            return customMessage.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        console.log(error)
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const listarTrailers = async function() {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        let result = await trailerDAO.selectAllTrailer()

        if (result) {
            if (result.length > 0) {
                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                customMessage.DEFAULT_MESSAGE.response.count = result.length
                customMessage.DEFAULT_MESSAGE.response.trailer = result

                return customMessage.DEFAULT_MESSAGE
            } else {
                return customMessage.ERROR_NOT_FOUND
            }
        } else {
            return customMessage.ERROR_INTERNAL_SERVER_MODEL
        }
    } catch (error) {
        console.log(error)
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const buscarTrailer = async function(id) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        if (id == undefined || String(id).replaceAll(' ', '') == '' || id == null || isNaN(id) || id <= 0) {
            customMessage.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'
            return customMessage.ERROR_BAD_REQUEST
        } else {
            let result = await trailerDAO.selectByIdTrailer(id)

            if (result) {
                if (result.length > 0) {
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.trailer = result

                    return customMessage.DEFAULT_MESSAGE
                } else {
                    return customMessage.ERROR_NOT_FOUND
                }
            } else {
                return customMessage.ERROR_INTERNAL_SERVER_MODEL
            }
        }
    } catch (error) {
        console.log(error)
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const excluirTrailer = async function(id) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        let resultBuscarID = await buscarTrailer(id)

        if (resultBuscarID.status) {
            let result = await trailerDAO.deleteTrailer(id)

            if (result) {
                return customMessage.SUCCESS_DELETED_ITEM
            } else {
                return customMessage.ERROR_INTERNAL_SERVER_MODEL
            }
        } else {
            return resultBuscarID
        }
    } catch (error) {
        console.log(error)
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const validarDados = async function(trailer) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    if (trailer.titulo == undefined || trailer.titulo == '' || trailer.titulo == null || trailer.titulo.length > 100) {
        customMessage.ERROR_BAD_REQUEST.field = '[TÍTULO] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST
    } else if (trailer.url_video == undefined || trailer.url_video == '' || trailer.url_video == null || trailer.url_video.length > 255) {
        customMessage.ERROR_BAD_REQUEST.field = '[URL_VIDEO] INVÁLIDA'
        return customMessage.ERROR_BAD_REQUEST
    } else if (trailer.data_publicacao == undefined || trailer.data_publicacao == '' || trailer.data_publicacao == null || trailer.data_publicacao.length != 10) {
        customMessage.ERROR_BAD_REQUEST.field = '[DATA_PUBLICACAO] INVÁLIDA'
        return customMessage.ERROR_BAD_REQUEST
    } else {
        return false
    }
}

const tratarDados = async function(trailer) {
    trailer.titulo = trailer.titulo.replaceAll("'", "")
    trailer.url_video = trailer.url_video.replaceAll("'", "")
    trailer.data_publicacao = trailer.data_publicacao.replaceAll("'", "")
    return trailer
}

module.exports = {
    inserirNovoTrailer,
    atualizarTrailer,
    listarTrailers,
    buscarTrailer,
    excluirTrailer
}