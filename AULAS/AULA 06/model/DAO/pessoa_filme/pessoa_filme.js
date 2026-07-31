/******************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados de PessoaFilme no banco de dados MySQL
 * Data: 11/07/2026
 * Autor: Gisele
 * Versão: 1.0
 ******************************************************************************************/

const knex = require('knex')
const knexDatabaseConfig = require('../../database_config/knexConfig.js')
const knexConection = knex(knexDatabaseConfig.development)

const insertPessoaFilme = async function(pessoaFilme) {
    try {
        let sql = `insert into tbl_pessoa_filme(
            id_pessoa,
            id_filme
        ) values(
            ${pessoaFilme.id_pessoa},
            ${pessoaFilme.id_filme}
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

const updatePessoaFilme = async function(pessoaFilme) {
    try {
        let sql = `update tbl_pessoa_filme set
                        id_pessoa = ${pessoaFilme.id_pessoa},
                        id_filme  = ${pessoaFilme.id_filme}
                    where id = ${pessoaFilme.id};`

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

const selectAllPessoaFilme = async function() {
    try {
        let sql = 'select * from tbl_pessoa_filme order by id desc'
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

const selectByIdPessoaFilme = async function(id) {
    try {
        let sql = `select * from tbl_pessoa_filme where id = ${id}`
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

const selectFilmeByIdPessoa = async function(idPessoa) {
    try {
        let sql = `select tbl_filme.* from tbl_filme 
                   inner join tbl_pessoa_filme on tbl_filme.id = tbl_pessoa_filme.id_filme 
                   where tbl_pessoa_filme.id_pessoa = ${idPessoa}`
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

const selectPessoaByIdFilme = async function(idFilme) {
    try {
        let sql = `select tbl_pessoa.* from tbl_pessoa 
                   inner join tbl_pessoa_filme on tbl_pessoa.id = tbl_pessoa_filme.id_pessoa 
                   where tbl_pessoa_filme.id_filme = ${idFilme}`
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

const deletePessoaFilme = async function(id) {
    try {
        let sql = `delete from tbl_pessoa_filme where id = ${id};`
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

const deletePessoasByIdFilme = async function(idFilme) {
    try {
        let sql = `delete from tbl_pessoa_filme where id_filme = ${idFilme};`
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

const deleteFilmesByIdPessoa = async function(idPessoa) {
    try {
        let sql = `delete from tbl_pessoa_filme where id_pessoa = ${idPessoa};`
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
    insertPessoaFilme,
    updatePessoaFilme,
    selectAllPessoaFilme,
    selectByIdPessoaFilme,
    selectFilmeByIdPessoa,
    selectPessoaByIdFilme,
    deletePessoaFilme,
    deletePessoasByIdFilme,
    deleteFilmesByIdPessoa
}