/******************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados de Trailer no banco de dados MySQL
 * Data: 10/07/2026
 * Autor: Gisele
 * Versão: 1.0
 ******************************************************************************************/

const knex = require('knex')
const knexDatabaseConfig = require('../../database_config/knexConfig.js')
const knexConection = knex(knexDatabaseConfig.development)

const insertTrailer = async function(trailer) {
    try {
        let sql = `insert into tbl_trailer(
            titulo,
            url_video,
            data_publicacao
        ) values(
            '${trailer.titulo}',
            '${trailer.url_video}',
            '${trailer.data_publicacao}'
        );`

        let result = await knexConection.raw(sql)
        if (result)
            return result[0].insertId
        else
            return false
    } catch (error) {
        console.log(error)
        return false
    }
}

const updateTrailer = async function(trailer) {
    try {
        let sql = `update tbl_trailer set
                        titulo          = '${trailer.titulo}',
                        url_video       = '${trailer.url_video}',
                        data_publicacao = '${trailer.data_publicacao}'
                    where id = ${trailer.id};`

        let result = await knexConection.raw(sql)
        if (result)
            return true
        else
            return false
    } catch (error) {
        console.log(error)
        return false
    }
}

const selectAllTrailer = async function() {
    try {
        let sql = 'select * from tbl_trailer order by id desc'
        let result = await knexConection.raw(sql)

        if (Array.isArray(result)) {
            return result[0]
        } else {
            return false
        }
    } catch (error) {
        console.log(error)
        return false
    }
}

const selectByIdTrailer = async function(id) {
    try {
        let sql = `select * from tbl_trailer where id = ${id}`
        let result = await knexConection.raw(sql)

        if (Array.isArray(result)) {
            return result[0]
        } else {
            return false
        }
    } catch (error) {
        console.log(error)
        return false
    }
}

const deleteTrailer = async function(id) {
    try {
        let sql = `delete from tbl_trailer where id = ${id};`
        let result = await knexConection.raw(sql)

        if (result)
            return true
        else
            return false
    } catch (error) {
        console.log(error)
        return false
    }
}

module.exports = {
    insertTrailer,
    updateTrailer,
    selectAllTrailer,
    selectByIdTrailer,
    deleteTrailer
}