//Comentário em linha
/*
    comentário
    em
    bloco
 */

// permite exibir um conteúdo no terminal
console.log('Testando o JS')

// permite a criação de uma variável
var nome = "Marcel"
console.log(nome)
console.log("O nome do usuário é: " + nome)

// se usar a crase ao invés das aspas, é possível concatenar tudo de uma vez (texto e variável)
console.log(`O nome do usuário é: ${nome}`)


// import da biblioteca do readline
// readline -> serve para permitir a entrada de dados via terminal
var readline = require("readline")

// cria um objeto especialista em entrada de dados pelo terminal
var entradaDeDados = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

// Permite a entrada de dados do nome do usuário
// question -> utiliza uma função de CALLBACK para devolver o valor digitado
// CALLBACK -> É uma função particular de um método que é chamada para 
// encaminhar um conteúdo para o desenvolvedor, esse conteúdo vem através
// da variável do argumento "nomeUsuario"
entradaDeDados.question('Digite seu nome: ',function(nomeUsuario){
    console.log("o nome digitado foi: " + nomeUsuario)

    entradaDeDados.question("Digite seu email: ", function(emailUsuario){
        console.log(`O email do usuário ${nomeUsuario} é: ${emailUsuario}`)
    })
})
