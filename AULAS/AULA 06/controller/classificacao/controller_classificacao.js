/******************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento e manipulação de dados de classificacao
 * Data: 15/05/2026
 * Autor: Gisele
 * Versão: 1.0
 ******************************************************************************************/
const configMessages = require('../modulo/configMessages.js')

const generoDAO = require('../../model/DAO/genero/genero.js')

//Inserir classificacao
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
                    customMessage.DEFAULT_MESSAGE.response = genero

                    return customMessage.DEFAULT_MESSAGE

                }else{
                    return customMessage.ERROR_INTERNAL_SERVER_MODEL//500(model)
                }
            }

        }else{
            return customMessage.ERROR_CONTENT_TYPE //415 
        }

    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER //500(controller)
    }
}

//Atualizar classificação
const atualizarClassificacao = async function(classificacao){}

const listarClassificacoes = async function(){}

const buscarClassificacao = async function(){}

const excluirClassificacao = async function(){}

const validarDados = async function(classificacao){

    let customMessage = JSON.parse(JSON.stringify(configMessages))

    if(classificacao.classificacao == undefined || classificacao.classificacao == '' || classificacao.classificacao == null || classificacao.classificacao.length > 2){
        customMessage.ERROR_BAD_REQUEST.field = '[CLASSIFICAÇÃO] INVÁLIDA'
        return customMessage.ERROR_BAD_REQUEST
    }
}

module.exports = {
    inserirNovaClassificacao,
    atualizarClassificacao,
    listarClassificacoes,
    buscarClassificacao,
    excluirClassificacao

}