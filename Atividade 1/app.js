/*********************************************************************************************************************************************
 * Objetivo: projeto de sistema de gestão para a loja de varejo Viva Moda
 * Autor: Gisele Rodrigues dos Santos
 * Data: 04/02/26
 * Versão: 1.0
 ************************************************************************************************************************************/

const readline = require("readline")

const entradaDeDados = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

entradaDeDados.question("Digite o nome do cliente: ", function(nome){
    let nomeCliente = nome.trim() 

    entradaDeDados.question("Produto que está sendo comprado: ", function(produto){
        let nomeProduto = produto.trim() 

        entradaDeDados.question("Valor da compra: ", function(valor1){
            let capitalInicial = Number(
                valor1.replace("R$", "").replace(",", ".").trim()
            ) 
            // remover o R$ e trocar a vírgula por ponto

            entradaDeDados.question("Taxa de juros: ", function(juros){
                let taxaDeJuros = Number(
                    juros.replace("%", "").replace(",", ".").trim()
                )
                // remove %, troca vírgula por ponto
                
                entradaDeDados.question("O pagamento será feito de forma anual ou mensal? ",function(escolha){
                    let escolhaCliente = escolha.toLowerCase().trim() 
                    //padroniza a escrita da escolha do cliente para não dar erro

                    entradaDeDados.question("Tempo de pagamento: ", function(tempo){
                        tempo = tempo
                            .replace("mês", "").replace("mes", "").replace("meses", "")
                            .replace("ano", "").replace("anos", "").trim()
                            //faz com que o sistema não quebre caso o usuário digite no tempo de pagamento algo como: 
                            // "1 ano", "2 meses" ao invés de colocar somente o número

                        let tempoDePagamento = Number(tempo)
                        let tempoFinal = tempo

                        if( nomeCliente == "" || nomeProduto == "" ||isNaN(capitalInicial) || isNaN(taxaDeJuros) ||
                            escolhaCliente == "" || isNaN(tempoDePagamento) || tempoDePagamento <= 0
                        ){
                            console.log("ERRO: Existem campos obrigatórios inválidos ou não preenchidos !!!") 
                        }else{
                            if(escolhaCliente === "anual"){
                                tempoFinal = tempoDePagamento * 12
                            }

                            let montanteFinal = capitalInicial * ((taxaDeJuros / 100 + 1) ** tempoFinal)
                            let acrescimo = montanteFinal - capitalInicial

                            console.log(`
                            ******************* Viva Moda *******************
                            Muito obrigado por realizar a sua compra conosco Sr(a) ${nomeCliente}
                            A compra do produto ${nomeProduto}, tem um valor de: R$ ${capitalInicial.toFixed(2)}.
                            A sua compra será parcelada em ${tempoFinal} vezes e o Sr(a) pagará: R$ ${montanteFinal.toFixed(2)}.
                            O acréscimo realizado ao valor de: R$ ${capitalInicial.toFixed(2)} será de R$ ${acrescimo.toFixed(2)}.

                            Muito obrigado por escolher a Viva Moda.
                            *******************************************************
                            `)
                        }
                    })
                })
            })
        })
    })
})
