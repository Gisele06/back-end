/******************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação das relações entre Filme e Trailer.
 * Data: 26/07/2026
 * Autor: Gisele
 * Versão: 1.0
 ******************************************************************************************/

const configMessages = require('../modulo/configMessages.js')
const filmeTrailerDAO = require('../../model/DAO/filme/filme_trailer.js')

const inserirNovoFilmeTrailer = async function(filmeTrailer) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        let validar = await validarDados(filmeTrailer)

        if (validar) {
            return validar
        } else {
            let result = await filmeTrailerDAO.insertFilmeTrailer(filmeTrailer)

            if (result) {
                filmeTrailer.id = result

                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_CREATED_ITEM.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_CREATED_ITEM.status_code
                customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_CREATED_ITEM.message
                customMessage.DEFAULT_MESSAGE.response = filmeTrailer

                return customMessage.DEFAULT_MESSAGE
            } else {
                return customMessage.ERROR_INTERNAL_SERVER_MODEL
            }
        }
    } catch (error) {
        console.log(error)
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const atualizarFilmeTrailer = async function(filmeTrailer, id) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        let resultBuscarID = await buscarFilmeTrailer(id)

        if (resultBuscarID.status) {
            let validar = await validarDados(filmeTrailer)

            if (!validar) {
                filmeTrailer.id = Number(id)
                let result = await filmeTrailerDAO.updateFilmeTrailer(filmeTrailer)

                if (result) {
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_UPDATED_ITEM.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_UPDATED_ITEM.status_code
                    customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_UPDATED_ITEM.message
                    customMessage.DEFAULT_MESSAGE.response = filmeTrailer

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
    } catch (error) {
        console.log(error)
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const listarFilmeTrailer = async function() {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        let result = await filmeTrailerDAO.selectAllFilmeTrailer()

        if (result) {
            if (result.length > 0) {
                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                customMessage.DEFAULT_MESSAGE.response.count = result.length
                customMessage.DEFAULT_MESSAGE.response.filme_trailer = result

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

const buscarFilmeTrailer = async function(id) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        if (id == undefined || String(id).replaceAll(' ', '') == '' || id == null || isNaN(id) || id <= 0) {
            customMessage.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'
            return customMessage.ERROR_BAD_REQUEST
        } else {
            let result = await filmeTrailerDAO.selectByIdFilmeTrailer(id)

            if (result) {
                if (result.length > 0) {
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.filme_trailer = result

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

const buscarTrailersIdFilme = async function(idFilme) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        if (idFilme == undefined || idFilme == null || idFilme == '' || isNaN(idFilme) || idFilme <= 0) {
            customMessage.ERROR_BAD_REQUEST.field = '[ID_FILME] INVÁLIDO'
            return customMessage.ERROR_BAD_REQUEST
        } else {
            let result = await filmeTrailerDAO.selectTrailerByIdFilme(idFilme)

            if (result) {
                if (result.length > 0) {
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.filme_trailer = result

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

const excluirFilmeTrailer = async function(id) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        let resultBuscarID = await buscarFilmeTrailer(id)

        if (resultBuscarID.status) {
            let result = await filmeTrailerDAO.deleteFilmeTrailer(id)

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

const excluirTrailersIdFilme = async function(idFilme) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        let result = await filmeTrailerDAO.deleteTrailersByIdFilme(idFilme)

        if (result) {
            return customMessage.SUCCESS_DELETED_ITEM
        } else {
            return customMessage.ERROR_INTERNAL_SERVER_MODEL
        }
    } catch (error) {
        console.log(error)
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const validarDados = async function(filmeTrailer) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    if (filmeTrailer.id_filme == undefined || filmeTrailer.id_filme == '' || filmeTrailer.id_filme == null || isNaN(filmeTrailer.id_filme) || filmeTrailer.id_filme <= 0) {
        customMessage.ERROR_BAD_REQUEST.field = '[ID_FILME] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST
    } else if (filmeTrailer.id_trailer == undefined || filmeTrailer.id_trailer == '' || filmeTrailer.id_trailer == null || isNaN(filmeTrailer.id_trailer) || filmeTrailer.id_trailer <= 0) {
        customMessage.ERROR_BAD_REQUEST.field = '[ID_TRAILER] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST
    } else {
        return false
    }
}

module.exports = {
    inserirNovoFilmeTrailer,
    atualizarFilmeTrailer,
    listarFilmeTrailer,
    buscarFilmeTrailer,
    buscarTrailersIdFilme,
    excluirFilmeTrailer,
    excluirTrailersIdFilme
}