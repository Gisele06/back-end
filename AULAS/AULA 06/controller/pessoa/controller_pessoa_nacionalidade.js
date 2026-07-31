/******************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação das relações entre Pessoa e Nacionalidade.
 * Data: 11/07/2026
 * Autor: Gisele
 * Versão: 1.0
 ******************************************************************************************/

const configMessages = require('../modulo/configMessages.js')
const pessoaNacionalidadeDAO = require('../../model/DAO/pessoa/pessoa_nacionalidade.js')

const inserirNovaPessoaNacionalidade = async function(pessoaNacionalidade) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        let validar = await validarDados(pessoaNacionalidade)

        if (validar) {
            return validar
        } else {
            let result = await pessoaNacionalidadeDAO.insertPessoaNacionalidade(pessoaNacionalidade)

            if (result) {
                pessoaNacionalidade.id = result

                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_CREATED_ITEM.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_CREATED_ITEM.status_code
                customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_CREATED_ITEM.message
                customMessage.DEFAULT_MESSAGE.response = pessoaNacionalidade

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

const atualizarPessoaNacionalidade = async function(pessoaNacionalidade, id) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        let resultBuscarID = await buscarPessoaNacionalidade(id)

        if (resultBuscarID.status) {
            let validar = await validarDados(pessoaNacionalidade)

            if (!validar) {
                pessoaNacionalidade.id = Number(id)
                let result = await pessoaNacionalidadeDAO.updatePessoaNacionalidade(pessoaNacionalidade)

                if (result) {
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_UPDATED_ITEM.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_UPDATED_ITEM.status_code
                    customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_UPDATED_ITEM.message
                    customMessage.DEFAULT_MESSAGE.response = pessoaNacionalidade

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

const listarPessoaNacionalidade = async function() {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        let result = await pessoaNacionalidadeDAO.selectAllPessoaNacionalidade()

        if (result) {
            if (result.length > 0) {
                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                customMessage.DEFAULT_MESSAGE.response.count = result.length
                customMessage.DEFAULT_MESSAGE.response.pessoa_nacionalidade = result

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

const buscarPessoaNacionalidade = async function(id) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        if (id == undefined || String(id).replaceAll(' ', '') == '' || id == null || isNaN(id) || id <= 0) {
            customMessage.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'
            return customMessage.ERROR_BAD_REQUEST
        } else {
            let result = await pessoaNacionalidadeDAO.selectByIdPessoaNacionalidade(id)

            if (result) {
                if (result.length > 0) {
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.pessoa_nacionalidade = result

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

const buscarNacionalidadesIdPessoa = async function(idPessoa) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        if (idPessoa == undefined || idPessoa == null || idPessoa == '' || isNaN(idPessoa) || idPessoa <= 0) {
            customMessage.ERROR_BAD_REQUEST.field = '[ID_PESSOA] INVÁLIDO'
            return customMessage.ERROR_BAD_REQUEST
        } else {
            let result = await pessoaNacionalidadeDAO.selectNacionalidadeByIdPessoa(idPessoa)

            if (result) {
                if (result.length > 0) {
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.pessoa_nacionalidade = result

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

const excluirPessoaNacionalidade = async function(id) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        let resultBuscarID = await buscarPessoaNacionalidade(id)

        if (resultBuscarID.status) {
            let result = await pessoaNacionalidadeDAO.deletePessoaNacionalidade(id)

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

const excluirNacionalidadesIdPessoa = async function(idPessoa) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        let result = await pessoaNacionalidadeDAO.deleteNacionalidadesByIdPessoa(idPessoa)

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

const validarDados = async function(pessoaNacionalidade) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    if (pessoaNacionalidade.id_pessoa == undefined || pessoaNacionalidade.id_pessoa == '' || pessoaNacionalidade.id_pessoa == null || isNaN(pessoaNacionalidade.id_pessoa) || pessoaNacionalidade.id_pessoa <= 0) {
        customMessage.ERROR_BAD_REQUEST.field = '[ID_PESSOA] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST
    } else if (pessoaNacionalidade.id_nacionalidade == undefined || pessoaNacionalidade.id_nacionalidade == '' || pessoaNacionalidade.id_nacionalidade == null || isNaN(pessoaNacionalidade.id_nacionalidade) || pessoaNacionalidade.id_nacionalidade <= 0) {
        customMessage.ERROR_BAD_REQUEST.field = '[ID_NACIONALIDADE] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST
    } else {
        return false
    }
}

module.exports = {
    inserirNovaPessoaNacionalidade,
    atualizarPessoaNacionalidade,
    listarPessoaNacionalidade,
    buscarPessoaNacionalidade,
    buscarNacionalidadesIdPessoa,
    excluirPessoaNacionalidade,
    excluirNacionalidadesIdPessoa
}