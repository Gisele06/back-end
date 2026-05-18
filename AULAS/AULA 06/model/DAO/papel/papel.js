/***********************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados de Papel no banco de dados MySQL
 * Data: 18/05/2026
 * Autor: Gisele
 * Versão: 1.0
 ******************************************************************************/

//Import da biblioteca para manipular dados no Banco de dados MySQL
const knex = require('knex')

//Import do arquivo de configuração para acesso ao banco de dados
const knexDatabaseConfig = require('../../database_config/knexConfig.js')

//Criar conexão com o banco de dados
const knexConection = knex(knexDatabaseConfig.development)

const insertPapel = async function(papel){

    try {

        let sql = `insert into tbl_papel(
            papel
        ) values(
            '${papel.papel}'
        );`

        let result = await knexConection.raw(sql)

        if(result)
            return result[0].insertId
        else
            return false

    } catch (error) {
        console.log(error)
        return false
    }
}

const updatePapel = async function(papel){

    try {

        let sql = `update tbl_papel set
                        papel = '${papel.papel}'
                    where id = ${papel.id};`

        let result = await knexConection.raw(sql)

        if(result)
            return true
        else
            return false

    } catch (error) {
        console.log(error)
        return false
    }
}

const selectAllPapel = async function(){

    try {

        let sql = 'select * from tbl_papel order by id desc'

        let result = await knexConection.raw(sql)

        if(Array.isArray(result)){
            return result[0]
        }else{
            return false
        }

    } catch (error) {
        console.log(error)
        return false
    }
}

const selectByIdPapel = async function(id){

    try {

        let sql = `select * from tbl_papel where id=${id}`

        let result = await knexConection.raw(sql)

        if(Array.isArray(result)){
            return result[0]
        }else{
            return false
        }

    } catch (error) {
        console.log(error)
        return false
    }
}

const deletePapel = async function(id){

    try {

        let sql = `delete from tbl_papel where id = ${id};`

        let result = await knexConection.raw(sql)

        if(result)
            return true
        else
            return false

    } catch (error) {
        console.log(error)
        return false
    }
}

module.exports = {
    insertPapel,
    updatePapel,
    selectAllPapel,
    selectByIdPapel,
    deletePapel
}