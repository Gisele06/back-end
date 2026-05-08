/******************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento, manipulação de dados referentes ao genero.
 * Data: 08/05/2026
 * Autor: Gisele
 * Versão: 1.0
 ******************************************************************************************/ 

//Import do arquivo de configurações de mensagens de projeto
const configMessages = require ('../modulo/configMessages.js')

//Import do arquivo do DAO para manipular os dados de filme no Banco de Dados
const filmeDAO = require('../../model/DAO/filme/filme.js')

const inserirNovoGenero = async function (genero){
    //Cria uma cópia dos JSON do arquivo de configuração (converte pra string e depois pra JSON novamente)
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        // if(String(contentType).toUpperCase() == 'APPLICATION/JSON')

    } catch (error) {
        
    }
}

const atualizarGenero = async function(){}

const listarGeneros = async function(){

}

const buscarGenero = async function(){}

const excluirGenero = async function(){}

const validarDados = async function(genero){
    let customMessage = JSON.parse(JSON.stringify(configMessages))
    

}