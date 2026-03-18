/***************************************************************************************************
 * Objetivo: Manipular dados em ARRAY E JSON
 * Autor: Gisele
 * Data: 05/03/26
 * Versão: 1.0 
 ***************************************************************************************************/

//Criando objetos do tipo ARRAY
const listaDeAlunos = ["José", "Maria", "Luiz", "Antônio", "Carlos"]
const listaDeClientes = []
const listaDeFornecedores = []

const exibirDados = function(){

    console.log(typeof(listaDeAlunos[6]))

    console.table(listaDeAlunos)

    console.log(listaDeAlunos[3])
    console.log(listaDeAlunos[0])
    
    console.log(`O nome do aluno é: ${listaDeAlunos[0]}`)
    console.log(`O nome do aluno é: ${listaDeAlunos[1]}`)
    console.log(`O nome do aluno é: ${listaDeAlunos[2]}`)
    console.log(`O nome do aluno é: ${listaDeAlunos[3]}`)
    console.log(`O nome do aluno é: ${listaDeAlunos[4]}`)

    console.log("**********Exemplo com WHILE***************")

    let cont = 0
    while(cont<5){
        console.log(`O nome do aluno é: ${listaDeAlunos[cont]}`)
        cont+=1
    }

    console.log("**********Exemplo com FOR****************")

    for(let contador = 0; contador < 5; contador++){
        console.log(`O nome do aluno é: ${listaDeAlunos[contador]}`)
    }

    console.log("********Exemplo com FOR EACH ************")

    listaDeAlunos.forEach(function(aluno){
        console.log(`O nome do aluno é: ${aluno}`)
    })

    console.log("********Exemplo com FOR OF ************")

    for (aluno of listaDeAlunos){
        console.log(`O nome do aluno é: ${aluno}`)
    }

    console.log("********Exemplo com FOR IN ************")

    for(aluno in listaDeAlunos){
        console.log(`O nome do aluno é: ${listaDeAlunos[aluno]}`)
    }

    console.log(listaDeAlunos.length)
}

const manipularDados = function(){

    listaDeClientes[0] = "Jose da Silva"
    listaDeClientes[1] = "Maria da Silva"
    listaDeClientes[2] = "Luiz da Silva"
    listaDeClientes[3] = "Ana da Silva"
    listaDeClientes[5] = "Beatriz da Silva"

    console.log(listaDeClientes)

    listaDeFornecedores.push("Antônio")
    listaDeFornecedores.push("Caio")
    listaDeFornecedores.push("Luiz")

    listaDeFornecedores.unshift('Luciano')

    console.log(listaDeFornecedores)

    listaDeFornecedores.splice(3,0,'Bernardo')

    console.table(listaDeFornecedores)

    listaDeFornecedores.splice(6,2)

    console.table(listaDeFornecedores)

    listaDeFornecedores.pop()

    console.table(listaDeFornecedores)

    listaDeFornecedores.shift()

    console.table(listaDeFornecedores)
}

const removerNome = function(nomeAluno){

    let cont = 0 
    let qtde = listaDeAlunos.length

    while(cont < qtde){
        if(nomeAluno == listaDeAlunos[cont]){
            listaDeAlunos.splice(cont, 1)
        }
        cont++
    }

}

const verificarItem = function(nomeAluno){

    return listaDeAlunos.includes(nomeAluno)
}

const manipularDadosJSON = function (){

    let aluno = {"id":1, "nome" :"José da Silva", "ra":123456, "email":"jose@gmail.com"}

    aluno.telefone = "011-975845252"
    aluno.data_nascimento = "10/05/2000"

    console.log(aluno)

    console.log(aluno.nome)

    delete aluno.email

    console.log(aluno)

} 

const cadastroDeProdutos = function(){

   let cores =  [
        {"id":1, "cor":"Branco",    "hexa": "#ffffff"},
        {"id":2, "cor":"Preto",     "hexa": "#000000"},
        {"id":3, "cor":"Azul",      "hexa": "#0000ff"},
        {"id":4, "cor":"Amarelo",   "hexa": "#000000"},
        {"id":5, "cor":"Rosa",      "hexa": "#000000"}
    ]

    console.log(cores)
    console.table(cores)

    let cont = 0
    let qtde = cores.length

    while(cont < qtde){
        console.log(cores[cont].cor)
        cont++
    }

    console.log("*******************************************************")

    cores.forEach(function(itemCor){
        console.log(itemCor.cor)
    })

    let marcas = [
        {"id":1, "marca":"Logitech",   "telefone":"12345678", "email":"logitech@gmail.com"},
        {"id":2, "marca":"Dell",       "telefone":"23647242", "email": "dell@gmail.com"},
        {"id":3, "marca":"Redragon",   "telefone":"34957493", "email": "redragon@gmail.com"},
        {"id":4, "marca":"Multilaser", "telefone":"48347834", "email": "multilaser@gmail.com"},
        {"id":5, "marca":"Razer",      "telefone":"93947634", "email": "razer@gmail.com"},
        {"id":6, "marca":"HyperX",     "telefone":"13847349", "email": "hyperx@gmail.com"}
    ]

    let produtos = [

        {
            "id":1,
            "nome":"monitor",
            "descricao":"Monitor de 27 Polegadas",
            "valor":1500,
            "qtde":20,
            "cor":[
                cores[0],
                cores[1]
            ],
            "marca":[
                marcas[1].marca
            ]
        },

        {
            "id":2,
            "nome":"teclado",
            "descricao":"Teclado Mecânico RGB",
            "valor":250,
            "qtde":500,
            "cor":cores,
            "marca":[
                marcas[3].marca,
                marcas[5].marca,
                marcas[1].marca,
                marcas[2].marca
            ]
        },

        {
            "id":3,
            "nome":"mouse",
            "descricao":"Mouse sem fio",
            "valor":80,
            "qtde":160,
            "cor":[
                cores[4],
                cores[1],
                cores[0]
            ],
            "marca":[
                marcas[0].marca,
                marcas[1].marca,
                marcas[2].marca,
                marcas[3].marca
            ]
        }

    ]

    console.log(produtos)

    produtos[0].cor.forEach(function(itemProduto){
        console.log(itemProduto.cor)
    })

    return produtos
}

const exibirProdutos = function(produtos){
    // //Extrai a cor
    // produtos.forEach(function(itemProduto){

    //     console.log(`Produto: ${itemProduto.nome}`)
    //     console.log(`Quantidade: ${itemProduto.qtde}`)
    //     console.log(`Valor: ${itemProduto.valor}`)

    //     //Extrai a cor
    //     itemProduto.cor.forEach(function(itemCor){
    //         console.log(`Cor: ${itemCor.cor}`)
    //     })
        
    //     //Extrai a marca
    //     itemProduto.marca.forEach(function(itemMarca){
    //         console.log(`Marca: ${itemMarca}`)
    //     })
    //     console.log("---------------")

    // })

    //Permite extrair os produtos
    produtos.forEach(function(itemProduto){
        console.log(`   Produto: ${itemProduto.nome}`)

        //Permite extrair as marcas dentro de cada produto
        itemProduto.marca.forEach(function(itemMarca){
            console.log(`   Marca: ${itemMarca}`)
        })

        //Permite extrair as cores dentro de cada produto
        itemProduto.cor.forEach(function(itemCor){
            console.log(`   Cor: ${itemCor.cor}`)
        })

    })

    console.log(`----------------------------------------------`)
    //Filtrando produtos pelo NOME
    console.log(`Exemplo de como pesquisar um produto pelo nome`)
    
    let nomeProduto = 'Mouse'
    produtos.forEach(function(itemProduto){
        if(String(nomeProduto).toLowerCase() == String(itemProduto.nome).toLowerCase()){
            console.log(itemProduto)
        }
    })
    
    console.log(`----------------------------------------------`)

     //Filtrando produtos pela COR
     console.log(`Exemplo de como pesquisar um produto pela cor`)
    
    let corProduto = 'branco'
    
    produtos.forEach(function(itemProduto){
        itemProduto.cor.forEach(function(itemCor){
            if(String(corProduto).toLowerCase() == String(itemCor.cor).toLowerCase()){
                console.log(itemProduto)
            }
        })
    })
 
}

console.table(listaDeAlunos)

removerNome('José')

console.table(listaDeAlunos)

manipularDadosJSON()

let produtos = cadastroDeProdutos()

exibirProdutos(produtos)
