/*********************************************************************************************************************************************
 * Objetivo: arquivo responsavel pelos calculos matematicos da aplicação
 * Autor: Gisele Rodrigues dos Santos
 * Data: 13/02/26
 * Versão: 1.0
 ************************************************************************************************************************************/

 function realizarCalculo(v1, v2, operacaoTratada){
   let resultado  
  
   if(operacaoTratada == "multiplicacao"){
      resultado = v1 * v2
   }else if(operacaoTratada == "divisao"){
      resultado = v1/v2
   }else if(operacaoTratada == "soma"){
      resultado = v1 + v2
   }else{
      resultado = v1 - v2
   }
       
   return resultado

    
 }

 module.exports = { realizarCalculo }