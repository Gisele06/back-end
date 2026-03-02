/********************************************************************************************************* 
 * Objetivo: 
 * Data: 01/03/26
 * Autor: Gisele
 * Versão: 1.0
 **********************************************************************************************************/

const { calcularImc, classificarImc } = require('./modulo/calculos')

const imc = calcularImc(70, 1.75)

if(imc){
    const status = classificarImc(imc)

    console.log(`IMC: ${imc.toFixed(2)}`)
    console.log(`Classificação: ${status}`)
} else {
    console.log("Dados inválidos")
}