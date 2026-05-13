/***********************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados do Gênero no banco de dados MySQL
 * Data: 15/04/2026
 * Autor: Gisele
 * Versão: 1.0
 ******************************************************************************/

const knex = require('knex')

const knexDatabaseConfig = require('../../database_config/knexConfig.js')

const knexConection = knex(knexDatabaseConfig.development)

//Inserir gênero
const insertGenero = async function(genero){

    try {

        let sql = `insert into tbl_genero(
                        genero
                    ) values(
                        '${genero.genero}'
                    );`

        let result = await knexConection.raw(sql)

        if(result)
            return result[0].insertId
        else
            return false

    } catch (error) {
        return false
    }
}

//Atualizar gênero
const updateGenero = async function(genero){

    try {

        let sql = `update tbl_genero set
                        genero = '${genero.genero}'
                    where id = ${genero.id};`

        let result = await knexConection.raw(sql)

        if(result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

//Listar todos os gêneros
const selectAllGenero = async function(){

    try {

        let sql = 'select * from tbl_genero order by id desc'

        let result = await knexConection.raw(sql)

        if(Array.isArray(result))
            return result[0]
        else
            return false

    } catch (error) {
        return false
    }
}

//Buscar gênero por ID
const selectByIdGenero = async function(id){

    try {

        let sql = `select * from tbl_genero where id = ${id}`

        let result = await knexConection.raw(sql)

        if(Array.isArray(result))
            return result[0]
        else
            return false

    } catch (error) {
        return false
    }
}

//Excluir gênero
const deleteGenero = async function(id){

    try {

        let sql = `delete from tbl_genero where id = ${id}`

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
    insertGenero,
    updateGenero,
    selectAllGenero,
    selectByIdGenero,
    deleteGenero
}