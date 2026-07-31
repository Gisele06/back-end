/******************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados de PessoaNacionalidade no banco MySQL
 * Data: 11/07/2026
 * Autor: Gisele
 * Versão: 1.0
 ******************************************************************************************/

const knex = require('knex')
const knexDatabaseConfig = require('../../database_config/knexConfig.js')
const knexConection = knex(knexDatabaseConfig.development)

const insertPessoaNacionalidade = async function(pessoaNacionalidade) {
    try {
        let sql = `insert into tbl_pessoa_nacionalidade(
            id_pessoa,
            id_nacionalidade
        ) values(
            ${pessoaNacionalidade.id_pessoa},
            ${pessoaNacionalidade.id_nacionalidade}
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

const updatePessoaNacionalidade = async function(pessoaNacionalidade) {
    try {
        let sql = `update tbl_pessoa_nacionalidade set
                        id_pessoa        = ${pessoaNacionalidade.id_pessoa},
                        id_nacionalidade = ${pessoaNacionalidade.id_nacionalidade}
                    where id = ${pessoaNacionalidade.id};`

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

const selectAllPessoaNacionalidade = async function() {
    try {
        let sql = 'select * from tbl_pessoa_nacionalidade order by id desc'
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

const selectByIdPessoaNacionalidade = async function(id) {
    try {
        let sql = `select * from tbl_pessoa_nacionalidade where id = ${id}`
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

const selectNacionalidadeByIdPessoa = async function(idPessoa) {
    try {
        let sql = `select tbl_nacionalidade.* from tbl_nacionalidade 
                   inner join tbl_pessoa_nacionalidade on tbl_nacionalidade.id = tbl_pessoa_nacionalidade.id_nacionalidade 
                   where tbl_pessoa_nacionalidade.id_pessoa = ${idPessoa}`
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

const deletePessoaNacionalidade = async function(id) {
    try {
        let sql = `delete from tbl_pessoa_nacionalidade where id = ${id};`
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

const deleteNacionalidadesByIdPessoa = async function(idPessoa) {
    try {
        let sql = `delete from tbl_pessoa_nacionalidade where id_pessoa = ${idPessoa};`
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
    insertPessoaNacionalidade,
    updatePessoaNacionalidade,
    selectAllPessoaNacionalidade,
    selectByIdPessoaNacionalidade,
    selectNacionalidadeByIdPessoa,
    deletePessoaNacionalidade,
    deleteNacionalidadesByIdPessoa
}