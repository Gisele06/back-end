/* *********************************************************************
* Objetivo: Arquivo com as funções responsáveis pela exibição dos estados e capitais do Brasil
* Data: 18/03/2026 
* Autor: Gisele
* **********************************************************************/

const listaDeEstados = require('./estados_cidades')

function getListaDeEstados(){
    const siglas = []
    let qtde = siglas.length
    
    listaDeEstados.estados.forEach(function(estado){
        siglas.push(estado.sigla)
    })
    
    return {
        uf: siglas,
        quantidade: qtde
    }
}
    
function getDadosEstado(siglaEstado){
    let resultado

    listaDeEstados.estados.forEach(function(estado){
        if(String(siglaEstado).toLowerCase() == String(estado.sigla).toLowerCase()){
            delete estado.cidades
            resultado = estado
        }
    })

    return resultado
}

function getCapitalEstado(siglaEstado){
    const estadoEscolhido = getDadosEstado(siglaEstado)

    return {
        uf: estadoEscolhido.sigla,
        descricao: estadoEscolhido.nome,
        capital: estadoEscolhido.capital
    }
}

function getEstadosRegiao(nomeRegiao){
    const estados = []

    listaDeEstados.estados.forEach(function(estado){
        if(String(estado.regiao).toLowerCase() == String(nomeRegiao).toLowerCase()){ 
            estados.push({
                uf: estado.sigla,
                descricao: estado.nome
            })
        }
    })

    return {
        regiao: nomeRegiao,
        estados: estados
    }
}

function getCapitalPais(){
    const capitais = []

    listaDeEstados.estados.forEach(function(estado){
        if (estado.capital_pais){
            capitais.push({
                capital_atual: estado.capital_pais.capital,
                uf: estado.sigla,
                descricao: estado.nome,
                capital: estado.capital,
                regiao: estado.regiao,
                capital_pais_ano_inicio: estado.capital_pais.ano_inicio,
                capital_pais_ano_termino: estado.capital_pais.ano_fim
            })
        }
    })

    return {
        capitais: 
        capitais
    }
}

function getCidades(siglaEstado){
    let estadoEscolhido 
    let cidades = []

    listaDeEstados.estados.forEach(function(estado){
        if(String(siglaEstado).toLowerCase() == String(estado.sigla).toLowerCase()){
            estadoEscolhido = estado
        }
    })

    estadoEscolhido.cidades.forEach(function(cidade){
        cidades.push(cidade.nome)
    })

    return {
        uf: estadoEscolhido.sigla,
        descricao: estadoEscolhido.nome,
        quantidade_cidades: cidades.length,
        cidades: cidades
    }
}

// console.log(getListaDeEstados())
// console.log(getDadosEstado('SP'))
// console.log(getEstadosRegiao('Sul'))
// console.log(getCapitalEstado('BA'))
// console.log(getCapitalPais())
// console.log(getCidades('AC'))

module.exports = {
    getCapitalEstado,
    getCapitalPais,
    getCidades,
    getListaDeEstados,
    getEstadosRegiao,
    getDadosEstado
}