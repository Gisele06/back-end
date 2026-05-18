/***********************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados da Nacionalidade no banco de dados
 *           MySQL
 * Data:     18/05/2026
 * Autor:    Gisele
 * Versão:   1.0
 **************************************************************/

//Import da biblioteca para manipular dados no Banco de dados MySQL
const knex = require('knex')

//Import do arquivo de configuração para acesso ao banco de dados
const knexDatabaseConfig = require('../../database_config/knexConfig.js')

//Criar a conexão com o BD Mysql conforme o arquivo de configuração
const knexConection = knex(knexDatabaseConfig.development)

//Função para inserir uma nova nacionalidade no banco de dados
const insertNacionalidade = async function(nacionalidade){

    try {

        let sql = `insert into tbl_nacionalidade(
            nacionalidade
        ) values(
            '${nacionalidade.nacionalidade}'
        );`

        //Encaminha para o BD o script SQL
        let result = await knexConection.raw(sql)

        if(result)
            return result[0].insertId //Retorna o ID gerado no insert
        else
            return false

    } catch (error) {
        return false
    }
}

//Função para atualizar uma nacionalidade existente no banco de dados
const updateNacionalidade = async function(nacionalidade){

    try {

        let sql = `update tbl_nacionalidade set
                        nacionalidade = '${nacionalidade.nacionalidade}'
                    where id = ${nacionalidade.id};`

        let result = await knexConection.raw(sql)

        if(result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

//Função para retornar todas as nacionalidades do banco de dados
const selectAllNacionalidade = async function(){

    try {

        //Script SQL para listar todas as nacionalidades
        let sql = 'select * from tbl_nacionalidade order by id desc'

        //Executa no banco de dados o script e guarda o retorno do banco
        let result = await knexConection.raw(sql)

        //Validação para verificar se o retorno do BD é um Array ou Boolean
        if(Array.isArray(result)){
            return result[0]
        }else{
            return false
        }

    } catch (error) {
        return false
    }
}

//Função para retornar uma nacionalidade filtrando pelo ID
const selectByIdNacionalidade = async function(id){

    try {

        let sql = `select * from tbl_nacionalidade where id=${id}`

        let result = await knexConection.raw(sql)

        if(Array.isArray(result)){
            return result[0]
        }else{
            return false
        }

    } catch (error) {
        return false
    }
}

//Função para excluir uma nacionalidade filtrando pelo ID
const deleteNacionalidade = async function(id){

    try {

        let sql = `delete from tbl_nacionalidade where id = ${id};`

        let result = await knexConection.raw(sql)

        if(result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

module.exports = {
    insertNacionalidade,
    updateNacionalidade,
    selectAllNacionalidade,
    selectByIdNacionalidade,
    deleteNacionalidade
}