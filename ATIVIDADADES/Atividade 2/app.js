/*********************************************************************************************************************************************
 * Objetivo: aplicação para a empresa Cálculos SA
 * Autor: Gisele Rodrigues dos Santos
 * Data: 13/02/26
 * Versão: 1.0
 ************************************************************************************************************************************/

const readline = require("readline")
const calculos = require("./modulo/calculos.js")
const validacoes = require("./modulo/validacoes.js")


const entradaDeDados = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

entradaDeDados.question("Digite o primeiro valor: ", function(valor1) {
    valor1 = valor1.replace("," , ".")
    //troca a vírgula pelo ponto para que o programa não pare de funcionar

    entradaDeDados.question("Digite o segundo valor: ", function(valor2) {
        valor2 = valor2.replace("," , ".")

        entradaDeDados.question("Qual operação será realizada? ", function(operacaoEscolhida) {
            let operacaoTratada = operacaoEscolhida
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, "")
            .trim()
            .toLowerCase()
            //padroniza a escolha do usuário para que o programa não pare de funcionar

            let validacao = validacoes.validarDados(valor1, valor2, operacaoTratada)

            if (validacao) {
                let v1 = Number(valor1)
                let v2 = Number(valor2)
                
                let resultado = calculos.realizarCalculo(v1, v2, operacaoTratada)
                
                if(operacaoTratada == "divisao" || operacaoTratada == "multiplicacao"){
                    console.log(` 
                        ${v1} / ${v2} = ${resultado.toFixed(2)}
                    `)
                }else if(operacaoTratada == "subtracao"){
                    console.log(` 
                        ${v1} - ${v2} = ${resultado.toFixed(2)}
                    `)
                }else if(operacaoTratada == "multiplicacao"){
                    console.log(` 
                        ${v1} x ${v2} = ${resultado.toFixed(2)}
                    `)
                }else{
                    console.log(` 
                        ${v1} + ${v2} = ${resultado.toFixed(2)}
                    `)
                }
                entradaDeDados.close()
            }else{
                entradaDeDados.close()
            }

        })
    })
})
