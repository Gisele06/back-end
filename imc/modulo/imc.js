/***************************************************************************************************
 * Objetivo: Arquivo responsável por fazer o cálculo do IMC (índice de massa corporal)
 * Autor: Gisele
 * Data: 04/03/26
 * Versão: 1.0
 ***************************************************************************************************/

function calcularImc(peso, altura){
    const p = Number(peso)
    const a = Number(altura)

    if (isNaN(p) || isNaN(a) || peso == "" || altura == "") {
        return false
    } else {
        const imc = p / (a * a)
        return imc
    }
}

function classificarImc(imc){
    let status

    if(imc <= 18.4){
        status = 'Abaixo do peso'
    } else if(imc >= 18.5 && imc <= 24.9){
        status = 'Peso normal'
    } else if(imc >= 25 && imc <= 29.9){
        status = 'Acima do peso'
    } else if(imc >= 30 && imc <= 34.9){
        status = 'Obesidade 1'
    } else if(imc >= 35 && imc <= 39.9){
        status = 'Obesidade 2'
    } else {
        status = 'Obesidade 3'
    }

    return status
}


module.exports = {
calcularImc, 
classificarImc
}