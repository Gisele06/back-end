/********************************************************************************************************* 
 * Objetivo: Arquivo responsável pelo processamento de cálculos matemáticos (SOMAR, SUBTRAIR,
 *  MULTIPLICAR E DIVIDIR)
 * Data: 20/02/26
 * Autor: Gisele
 * Versão: 1.0
 **********************************************************************************************************/

//Exemplo de função anônima
//Função para calcular as quatro operações matemáticas
const calcular = function(numero1, numero2, operador){
    let valor1 = Number(numero1)
    let valor2 = Number(numero2)
    let operadorMatematico = String(operador).toUpperCase()
    //Garante que a função comece sempre como falsa, a não ser
    //que ele entre em alguma condição do if
    let resultado = false

    //Processamento
    //não precisa de chaves quando tiver 1 linha só
    // if(operadorMatematico == "SOMAR")
    //     resultado = valor1 + valor2
    // else if(operadorMatematico == "SUBTRAIR")
    //     resultado = valor1 - valor2
    // else if(operadorMatematico == "DIVIDIR")
    //     resultado = valor1 / valor2
    // else if(operadorMatematico == "MULTIPLICAR")
    //     resultado = valor1 * valor2

    switch (operadorMatematico) {
        case "SOMAR":
            resultado = somar(valor1, valor2)
            break;
        case "SUBTRAIR":
            resultado = subtrair(valor1, valor2)            
            break;   
        case "DIVIDIR":
            resultado = dividir(valor1, valor2)
        break;
        case "MULTIPLICAR":
            resultado = multiplicar(valor1, valor2)
            break;
    
    }

    return resultado
}

//Função baseada em formato de seta (ARROW FUNCTION)
const somar = (numero1, numero2) => Number(numero1) + Number(numero2)
const subtrair = (numero1, numero2) => Number(numero1) - Number(numero2)
const dividir = (numero1, numero2) => Number(numero1) / Number(numero2)
const multiplicar = (numero1, numero2) => Number(numero1) * Number(numero2)

const validarDados = function(numero1, numero2, operador){
    let valor1 = Number(numero1)
    let valor2 = Number(numero2)
    let tipoCalculo = String(operador)

    if(numero == "" || isNaN(numero1) || numero2 == "" || isNaN(numero2)|| operador == ""){
        return false
    }else{
        return true
    }
}

module.exports = {
    calcular, 
    somar, 
    subtrair, 
    dividir, 
    multiplicar
}