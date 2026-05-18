/***********************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados de Pessoa no banco de dados MySQL
 * Data: 18/05/2026
 * Autor: Gisele
 * Versão: 1.0
 ******************************************************************************/

const knex = require('knex')

const knexDatabaseConfig = require('../../database_config/knexConfig.js')

const knexConection = knex(knexDatabaseConfig.development)


const insertPessoa = async function(pessoa){

    try {

        let sql = `insert into tbl_pessoa(
            nome,
            nome_completo,
            biografia,
            url_foto,
            idade,
            data_nascimento,
            anos_de_carreira,
            quantidade_filmes_feitos
        ) values(
            '${pessoa.nome}',
            '${pessoa.nome_completo}',
            '${pessoa.biografia}',
            '${pessoa.url_foto}',
            '${pessoa.idade}',
            '${pessoa.data_nascimento}',
            '${pessoa.anos_de_carreira}',
            '${pessoa.quantidade_filmes_feitos}'
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

const updatePessoa = async function(pessoa){

    try {

        let sql = `update tbl_pessoa set
                        nome = '${pessoa.nome}',
                        nome_completo = '${pessoa.nome_completo}',
                        biografia = '${pessoa.biografia}',
                        url_foto = '${pessoa.url_foto}',
                        idade = '${pessoa.idade}',
                        data_nascimento = '${pessoa.data_nascimento}',
                        anos_de_carreira = '${pessoa.anos_de_carreira}',
                        quantidade_filmes_feitos = '${pessoa.quantidade_filmes_feitos}'
                    where id = ${pessoa.id};`

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

const selectAllPessoa = async function(){

    try {

        let sql = 'select * from tbl_pessoa order by id desc'

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

const selectByIdPessoa = async function(id){

    try {

        let sql = `select * from tbl_pessoa where id=${id}`

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

const deletePessoa = async function(id){

    try {

        let sql = `delete from tbl_pessoa where id = ${id};`

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
    insertPessoa,
    updatePessoa,
    selectAllPessoa,
    selectByIdPessoa,
    deletePessoa
}