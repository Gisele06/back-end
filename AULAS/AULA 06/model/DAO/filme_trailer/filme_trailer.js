/******************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados de FilmeTrailer no banco de dados MySQL
 * Data: 11/07/2026
 * Autor: Gisele
 * Versão: 1.0
 ******************************************************************************************/

const knex = require('knex')
const knexDatabaseConfig = require('../../database_config/knexConfig.js')
const knexConection = knex(knexDatabaseConfig.development)

const insertFilmeTrailer = async function(filmeTrailer) {
    try {
        let sql = `insert into tbl_filme_trailer(
            id_filme,
            id_trailer
        ) values(
            ${filmeTrailer.id_filme},
            ${filmeTrailer.id_trailer}
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

const updateFilmeTrailer = async function(filmeTrailer) {
    try {
        let sql = `update tbl_filme_trailer set
                        id_filme   = ${filmeTrailer.id_filme},
                        id_trailer = ${filmeTrailer.id_trailer}
                    where id = ${filmeTrailer.id};`

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

const selectAllFilmeTrailer = async function() {
    try {
        let sql = 'select * from tbl_filme_trailer order by id desc'
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

const selectByIdFilmeTrailer = async function(id) {
    try {
        let sql = `select * from tbl_filme_trailer where id = ${id}`
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

const selectTrailerByIdFilme = async function(idFilme) {
    try {
        let sql = `select tbl_trailer.* from tbl_trailer 
                   inner join tbl_filme_trailer on tbl_trailer.id = tbl_filme_trailer.id_trailer 
                   where tbl_filme_trailer.id_filme = ${idFilme}`
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

const selectFilmeByIdTrailer = async function(idTrailer) {
    try {
        let sql = `select tbl_filme.* from tbl_filme 
                   inner join tbl_filme_trailer on tbl_filme.id = tbl_filme_trailer.id_filme 
                   where tbl_filme_trailer.id_trailer = ${idTrailer}`
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

const deleteFilmeTrailer = async function(id) {
    try {
        let sql = `delete from tbl_filme_trailer where id = ${id};`
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

const deleteTrailersByIdFilme = async function(idFilme) {
    try {
        let sql = `delete from tbl_filme_trailer where id_filme = ${idFilme};`
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
    insertFilmeTrailer,
    updateFilmeTrailer,
    selectAllFilmeTrailer,
    selectByIdFilmeTrailer,
    selectTrailerByIdFilme,
    selectFilmeByIdTrailer,
    deleteFilmeTrailer,
    deleteTrailersByIdFilme
}