
/*********************************************************************************************************************************************
 * Objetivo: projeto para realizar o cálculo de médias escolares
 * Autor: Gisele Rodrigues
 * Data: 29/01/26
 * Versão: 1.0
 ************************************************************************************************************************************/

/*

    Tipos de criação de variáveis

    var -> permite criar um espaço em memória do tipo variável.
        (projetos atuais não utilizam muito, é provável que seja encontrada apenas em projetos mais antigos) 
        Dica: caso precise usar o var, recomenda-se que seja utilizado apenas em escopo global 
        (escopo global: objetos criados no começo que são utilizados em todo o projeto, escopo local: só existe dentro daquele bloco)


    let -> Permite criar um espaço em memória do tipo variável.
        Essa forma de criação é realizada somente no escopo local, ou seja,
        dentro de bloco de programação {}.
        esse tipo de variável deixa de existir ao término do bloco.
    
    const -> Permite criar um espaço em memória do tipo constante, ou seja,
        esse conteúdo não poderá sofrer mudanças durante o projeto.
        Dica: Se possível você pode criar essa const escrita em MAIÚSCULO
        para facilitar a sua utilização.
        (pode ser criada de forma local ou global)
    
    Operadores de comparação:
        ==  igual             -> Permite a comparação de dois conteúdos
        !=  diferente         -> Permite comparar a diferença de dois conteúdos 
        <   menor que         -> Permite validar o valor menor
        >   maior que         -> Permite validar o valor maior
        <=  menor ou igual a  -> Permite validar o valor menor ou igual
        >=  maior ou igual a  -> Permite validar o valor maior ou igual

        === -> Permite comparar a igualdade dos conteúdos e a igualdade
               tipagem de dados

        !== -> Permite comparar a diferença dos conteúdos e a igualdade
               de tipagem de dados

        ==! -> Permite comparar a igualdade dos conteúdos e a diferença
               de tipagem de dados

    Tipos de operadores lógicos:
        E -> AND -> &&
        OU -> OR -> ||
        NÃO -> NOT -> !

    isNaN: is not a number

    Formas de conversão de tipos de dados
        parseInt()-> Permite converter um conteúdo em número do tipo INTEIRO

        parseFloat()-> Permite converter um conteúdo em número do tipo DECIMAL (quebrado)

        Number()-> Permite converter um conteúdo para NUMERO, podendo ser 
        inteiro ou decimal

        String()-> Permite converter um conteúdo em STRING
        Boolean()-> Permite converter um conteúdo para BOOLEANO(true or false)

        typeof()-> Retorna o tipo de dados de uma variável
            (String, Number, Boolean ou Object)
    ...
    [] -> Array
    {}-> Json
    Para o javascript ambos são objetos, sem diferenciação
*/

//import da biblioteca de entrada de dados
const readline = require("readline")
const { isStringObject } = require("util/types")

//Criação do objeto para captar as entradas de dados 
const entradaDeDados = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

//Entrada de dados do nome 
entradaDeDados.question("Digite o nome do aluno: ", function(nome){
    //Recebe o nome do aluno
    //é um clone do que chegou, para que possamos fazer alterações mas também tenhamos guardados o original
    let nomeAluno = nome 


    entradaDeDados.question("Digite a nota1: ", function(valor1){
        let nota1 = valor1
    
        entradaDeDados.question("Digite a nota2: ", function(valor2){
            let nota2 = valor2
    
            entradaDeDados.question("Digite a nota3: ", function(valor3){
                let nota3 = valor3
    
                entradaDeDados.question("Digite a nota4: ", function(valor4){
                    let nota4 = valor4

                    if(nomeAluno == "" ||nota1 == "" || nota2 == "" || nota3 == "" || nota4 == ""){
                        console.log("ERRO: Existem campos obrigatórios que não foram preenchidos !!!")
                        //Validação de entrada vazia
                    }else if(nota1 > 100 || nota1 < 0||nota2 > 100 || nota2 < 0 || nota3 > 100 || nota3 < 0 || nota4 > 100 || nota4 < 0 ){
                        console.log("ERRO: Somente são aceitos valores de 0 a 100 ! ! !")
                        //Validação de entrada de números apenas entre 0 e 100
                    }else if(isNaN(nota1) || isNaN (nota2)|| isNaN (nota3)|| isNaN (nota4)){
                        console.log("ERRO: Somente números são permitidos na entrada das notas !!!")
                    }else{
                        let media = (Number(nota1) + Number(nota2) + Number(nota3) + Number(nota4))/4 
                        //toFixed()-> É um método que permite fixar a quantidade de casas decimais
                        
                        if(media >= 70){
                            statusAluno = (`APROVADO(A) !!!`)
                        }else if(media >= 50 && media < 70){
                            statusAluno = (`RECUPERAÇÃO !!!`)
                        }else{
                            statusAluno = (`REPROVADO(A)!!!`)
                        }

                        console.log(` ALUNO: ${nomeAluno}\n MÉDIA FINAL: ${media.toFixed(2)}\n STATUS DE APROVAÇÃO: ${statusAluno}`)
                    }

                }) //Fecha nota4
            }) //Fecha nota3
        }) //fecha nota2
    }) //Fecha nota1
}) //Fecha nome

