/******************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados de PessoaAtividade no banco MySQL
 * Data: 11/07/2026
 * Autor: Gisele
 * Versão: 1.0
 ******************************************************************************************/

const knex = require('knex')
const knexDatabaseConfig = require('../../database_config/knexConfig.js')
const knexConection = knex(knexDatabaseConfig.development)

const insertPessoaAtividade = async function(pessoaAtividade) {
    try {
        let sql = `insert into tbl_pessoa_atividade(
            id_pessoa,
            id_atividade
        ) values(
            ${pessoaAtividade.id_pessoa},
            ${pessoaAtividade.id_atividade}
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

const updatePessoaAtividade = async function(pessoaAtividade) {
    try {
        let sql = `update tbl_pessoa_atividade set
                        id_pessoa    = ${pessoaAtividade.id_pessoa},
                        id_atividade = ${pessoaAtividade.id_atividade}
                    where id = ${pessoaAtividade.id};`

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

const selectAllPessoaAtividade = async function() {
    try {
        let sql = 'select * from tbl_pessoa_atividade order by id desc'
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

const selectByIdPessoaAtividade = async function(id) {
    try {
        let sql = `select * from tbl_pessoa_atividade where id = ${id}`
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

const selectAtividadeByIdPessoa = async function(idPessoa) {
    try {
        let sql = `select tbl_atividade.* from tbl_atividade 
                   inner join tbl_pessoa_atividade on tbl_atividade.id = tbl_pessoa_atividade.id_atividade 
                   where tbl_pessoa_atividade.id_pessoa = ${idPessoa}`
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

const deletePessoaAtividade = async function(id) {
    try {
        let sql = `delete from tbl_pessoa_atividade where id = ${id};`
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

const deleteAtividadesByIdPessoa = async function(idPessoa) {
    try {
        let sql = `delete from tbl_pessoa_atividade where id_pessoa = ${idPessoa};`
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
    insertPessoaAtividade,
    updatePessoaAtividade,
    selectAllPessoaAtividade,
    selectByIdPessoaAtividade,
    selectAtividadeByIdPessoa,
    deletePessoaAtividade,
    deleteAtividadesByIdPessoa
}