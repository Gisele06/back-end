/*************************************************
 * Objetivo: Arquivo responsável por gerar uma tabuada utilizando WHILE E FOR
 * Data: 25/02/26
 * Autor: Gisele
 * Versão: 1.0
 ************************************************/
//Import da biblioteca de opeerações matemáticas
const calculosMatematicos = require("./calculo.js")

// Função para imprimir a tabuada
const gerarTabuadaWhile = function(tabuada){
    let tab = Number(tabuada)
    let cont = 0
    let resultado 
    
    while(cont <= 10){
        //Processamento
        resultado = calculosMatematicos.multiplicar(tab, cont)
        console.log(tab + 'x' + cont + '=' + resultado)

        cont = cont + 1
    }


    
}

// Função para imprimir a tabuada
const gerarTabuadaFor = function(tabuada){
    let tab = Number(tabuada)
    let resultado 
    
    for(cont = 0; cont<= 10; cont++){
        //Processamento
        resultado = calculosMatematicos.multiplicar(tab, cont)
        console.log(tab + 'x' + cont + '=' + resultado)

    }


    
}

gerarTabuadaFor(3)