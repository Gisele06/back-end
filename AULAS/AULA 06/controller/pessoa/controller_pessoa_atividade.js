/******************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação das relações entre Pessoa e Atividade.
 * Data: 11/07/2026
 * Autor: Gisele
 * Versão: 1.0
 ******************************************************************************************/

const configMessages = require('../modulo/configMessages.js')
const pessoaAtividadeDAO = require('../../model/DAO/pessoa_atividade/pessoa_atividade.js')

const inserirNovaPessoaAtividade = async function(pessoaAtividade) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        let validar = await validarDados(pessoaAtividade)

        if (validar) {
            return validar
        } else {
            let result = await pessoaAtividadeDAO.insertPessoaAtividade(pessoaAtividade)

            if (result) {
                pessoaAtividade.id = result

                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_CREATED_ITEM.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_CREATED_ITEM.status_code
                customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_CREATED_ITEM.message
                customMessage.DEFAULT_MESSAGE.response = pessoaAtividade

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

const atualizarPessoaAtividade = async function(pessoaAtividade, id) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        let resultBuscarID = await buscarPessoaAtividade(id)

        if (resultBuscarID.status) {
            let validar = await validarDados(pessoaAtividade)

            if (!validar) {
                pessoaAtividade.id = Number(id)
                let result = await pessoaAtividadeDAO.updatePessoaAtividade(pessoaAtividade)

                if (result) {
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_UPDATED_ITEM.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_UPDATED_ITEM.status_code
                    customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_UPDATED_ITEM.message
                    customMessage.DEFAULT_MESSAGE.response = pessoaAtividade

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

const listarPessoaAtividade = async function() {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        let result = await pessoaAtividadeDAO.selectAllPessoaAtividade()

        if (result) {
            if (result.length > 0) {
                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                customMessage.DEFAULT_MESSAGE.response.count = result.length
                customMessage.DEFAULT_MESSAGE.response.pessoa_atividade = result

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

const buscarPessoaAtividade = async function(id) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        if (id == undefined || String(id).replaceAll(' ', '') == '' || id == null || isNaN(id) || id <= 0) {
            customMessage.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'
            return customMessage.ERROR_BAD_REQUEST
        } else {
            let result = await pessoaAtividadeDAO.selectByIdPessoaAtividade(id)

            if (result) {
                if (result.length > 0) {
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.pessoa_atividade = result

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

const buscarAtividadesIdPessoa = async function(idPessoa) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        if (idPessoa == undefined || idPessoa == null || idPessoa == '' || isNaN(idPessoa) || idPessoa <= 0) {
            customMessage.ERROR_BAD_REQUEST.field = '[ID_PESSOA] INVÁLIDO'
            return customMessage.ERROR_BAD_REQUEST
        } else {
            let result = await pessoaAtividadeDAO.selectAtividadeByIdPessoa(idPessoa)

            if (result) {
                if (result.length > 0) {
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.pessoa_atividade = result

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

const excluirPessoaAtividade = async function(id) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        let resultBuscarID = await buscarPessoaAtividade(id)

        if (resultBuscarID.status) {
            let result = await pessoaAtividadeDAO.deletePessoaAtividade(id)

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

const excluirAtividadesIdPessoa = async function(idPessoa) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        let result = await pessoaAtividadeDAO.deleteAtividadesByIdPessoa(idPessoa)

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

const validarDados = async function(pessoaAtividade) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    if (pessoaAtividade.id_pessoa == undefined || pessoaAtividade.id_pessoa == '' || pessoaAtividade.id_pessoa == null || isNaN(pessoaAtividade.id_pessoa) || pessoaAtividade.id_pessoa <= 0) {
        customMessage.ERROR_BAD_REQUEST.field = '[ID_PESSOA] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST
    } else if (pessoaAtividade.id_atividade == undefined || pessoaAtividade.id_atividade == '' || pessoaAtividade.id_atividade == null || isNaN(pessoaAtividade.id_atividade) || pessoaAtividade.id_atividade <= 0) {
        customMessage.ERROR_BAD_REQUEST.field = '[ID_ATIVIDADE] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST
    } else {
        return false
    }
}

module.exports = {
    inserirNovaPessoaAtividade,
    atualizarPessoaAtividade,
    listarPessoaAtividade,
    buscarPessoaAtividade,
    buscarAtividadesIdPessoa,
    excluirPessoaAtividade,
    excluirAtividadesIdPessoa
}