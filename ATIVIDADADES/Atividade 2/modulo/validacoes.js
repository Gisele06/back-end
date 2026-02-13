/*********************************************************************************************************************************************
 * Objetivo: arquivo responsável por realizar as validações de dados da aplicação
 * Autor: Gisele Rodrigues dos Santos
 * Data: 13/02/26
 * Versão: 1.0
 ************************************************************************************************************************************/

function validarDados(valor1, valor2, operacaoTratada) {
    const operacoesValidas = ["soma", "subtracao", "multiplicacao", "divisao"]

    if (valor1 === "" || valor2 === "" || operacaoTratada === "") {
        console.log("ERRO: Existem campos obrigatórios que não foram preenchidos!")
        return false
    } else if (isNaN(valor1) || isNaN(valor2)) {
        console.log("ERRO: São permitidos somente números e valores com no máximo 2 casas decimais.")
        return false
    } else if (!operacoesValidas.includes(operacaoTratada)) {
        console.log("ERRO: Operação inválida! Escolha: soma, subtracao, multiplicacao ou divisao.")
        return false
    }else if(valor2 == "0" && operacaoTratada == "divisao" ){
        console.log("ERRO: Não é possível dividir um número por 0")
        return false
    }else{
        return true
    }

}

module.exports = { validarDados }