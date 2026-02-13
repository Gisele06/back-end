/***************************************************************************************************
 * Objetivo: Projeto para realizar o cálculo de médias escolares
 * Autor: Gisele Rodrigues
 * Data: 29/01/26
 * Versão: 1.1 (Corrigida)
 ***************************************************************************************************/

const readline = require("readline")
const calculos = require("./modulo/calculos.js")

const entradaDeDados = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

// Entrada de dados
entradaDeDados.question("Digite o nome do aluno: ", function (nome) {

    let nomeAluno = nome

    entradaDeDados.question("Digite a nota1: ", function (nota1) {

        entradaDeDados.question("Digite a nota2: ", function (nota2) {

            entradaDeDados.question("Digite a nota3: ", function (nota3) {

                entradaDeDados.question("Digite a nota4: ", function (nota4) {

                    let mediaFinal = calculos.calcularMedia(nota1, nota2, nota3, nota4)

                    if (mediaFinal) {
                        let statusAluno = calculos.definirStatus(mediaFinal)

                        console.log(`
                            ---------------- RESULTADO ----------------
                            ALUNO: ${nomeAluno}
                            MÉDIA FINAL: ${mediaFinal.toFixed(2)}
                            STATUS: ${statusAluno}
                            -------------------------------------------
                        `)

                    } else {
                        console.log("ERRO: não foi possível processar a média do aluno.")
                        entradaDeDados.close()
                    }
                })
            })
        })
    })
})
