/******************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação das relações entre Pessoa e Filme.
 * Data: 11/07/2026
 * Autor: Gisele
 * Versão: 1.0
 ******************************************************************************************/

const configMessages = require('../modulo/configMessages.js')
const pessoaFilmeDAO = require('../../model/DAO/pessoa_filme/pessoa_filme.js')

const inserirNovaPessoaFilme = async function(pessoaFilme) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        let validar = await validarDados(pessoaFilme)

        if (validar) {
            return validar
        } else {
            let result = await pessoaFilmeDAO.insertPessoaFilme(pessoaFilme)

            if (result) {
                pessoaFilme.id = result

                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_CREATED_ITEM.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_CREATED_ITEM.status_code
                customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_CREATED_ITEM.message
                customMessage.DEFAULT_MESSAGE.response = pessoaFilme

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

const atualizarPessoaFilme = async function(pessoaFilme, id) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        let resultBuscarID = await buscarPessoaFilme(id)

        if (resultBuscarID.status) {
            let validar = await validarDados(pessoaFilme)

            if (!validar) {
                pessoaFilme.id = Number(id)
                let result = await pessoaFilmeDAO.updatePessoaFilme(pessoaFilme)

                if (result) {
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_UPDATED_ITEM.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_UPDATED_ITEM.status_code
                    customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_UPDATED_ITEM.message
                    customMessage.DEFAULT_MESSAGE.response = pessoaFilme

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

const listarPessoaFilme = async function() {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        let result = await pessoaFilmeDAO.selectAllPessoaFilme()

        if (result) {
            if (result.length > 0) {
                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                customMessage.DEFAULT_MESSAGE.response.count = result.length
                customMessage.DEFAULT_MESSAGE.response.pessoa_filme = result

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

const buscarPessoaFilme = async function(id) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        if (id == undefined || String(id).replaceAll(' ', '') == '' || id == null || isNaN(id) || id <= 0) {
            customMessage.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'
            return customMessage.ERROR_BAD_REQUEST
        } else {
            let result = await pessoaFilmeDAO.selectByIdPessoaFilme(id)

            if (result) {
                if (result.length > 0) {
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.pessoa_filme = result

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

const buscarFilmesIdPessoa = async function(idPessoa) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        if (idPessoa == undefined || idPessoa == null || idPessoa == '' || isNaN(idPessoa) || idPessoa <= 0) {
            customMessage.ERROR_BAD_REQUEST.field = '[ID_PESSOA] INVÁLIDO'
            return customMessage.ERROR_BAD_REQUEST
        } else {
            let result = await pessoaFilmeDAO.selectFilmeByIdPessoa(idPessoa)

            if (result) {
                if (result.length > 0) {
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.pessoa_filme = result

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

const buscarPessoasIdFilme = async function(idFilme) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        if (idFilme == undefined || idFilme == null || idFilme == '' || isNaN(idFilme) || idFilme <= 0) {
            customMessage.ERROR_BAD_REQUEST.field = '[ID_FILME] INVÁLIDO'
            return customMessage.ERROR_BAD_REQUEST
        } else {
            let result = await pessoaFilmeDAO.selectPessoaByIdFilme(idFilme)

            if (result) {
                if (result.length > 0) {
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.pessoa_filme = result

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

const excluirPessoaFilme = async function(id) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        let resultBuscarID = await buscarPessoaFilme(id)

        if (resultBuscarID.status) {
            let result = await pessoaFilmeDAO.deletePessoaFilme(id)

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

const excluirPessoasIdFilme = async function(idFilme) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        let result = await pessoaFilmeDAO.deletePessoasByIdFilme(idFilme)

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

const excluirFilmesIdPessoa = async function(idPessoa) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        let result = await pessoaFilmeDAO.deleteFilmesByIdPessoa(idPessoa)

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

const validarDados = async function(pessoaFilme) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    if (pessoaFilme.id_pessoa == undefined || pessoaFilme.id_pessoa == '' || pessoaFilme.id_pessoa == null || isNaN(pessoaFilme.id_pessoa) || pessoaFilme.id_pessoa <= 0) {
        customMessage.ERROR_BAD_REQUEST.field = '[ID_PESSOA] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST
    } else if (pessoaFilme.id_filme == undefined || pessoaFilme.id_filme == '' || pessoaFilme.id_filme == null || isNaN(pessoaFilme.id_filme) || pessoaFilme.id_filme <= 0) {
        customMessage.ERROR_BAD_REQUEST.field = '[ID_FILME] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST
    } else {
        return false
    }
}

module.exports = {
    inserirNovaPessoaFilme,
    atualizarPessoaFilme,
    listarPessoaFilme,
    buscarPessoaFilme,
    buscarFilmesIdPessoa,
    buscarPessoasIdFilme,
    excluirPessoaFilme,
    excluirPessoasIdFilme,
    excluirFilmesIdPessoa
}