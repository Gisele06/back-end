/***********************************************************
 * Objetivo:Arquivo responsável pelo CRUD de dados do Gênero do filme no banco de dados
 *          MySQL
 * Data:    08/05/2026
 * Autor:   Gisele
 * Versão:  1.0
 ******************************************************************************/
//Import da biblioteca para manipular dados no Banco de dados MySQL
const knex = require('knex')

//Import do arquivo de configuração para acesso ao banco de dados
const knexDatabaseConfig = require('../../database_config/knexConfig.js')

//Criar a conexão com o BD Mysql conforme o arquivo de configuração
const knexConection = knex(knexDatabaseConfig.development)

const insertGenero = async function (genero){
   try {

    let sql =  `insert into tbl_genero(
        genero
    )values(
        ${genero.genero}
    );`

    //Encaminha para o BD o scriptSQL
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
    insertGenero
}