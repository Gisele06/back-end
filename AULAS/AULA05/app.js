/* *************************************************************************************************
* Objetivo: Arquivo responsável pela criação da API do projeto de Estados e cidades
* Data: 01/04/2026 
* Autor: Gisele
* Versão: 1.0
* **************************************************************************************************/

/* 
    HTTP verbos
    POST    -> Inserir novos dados
    GET     -> Retornar dados
    PUT     -> Alterar dados existentes
    DELETE  -> Remover dados

*/

//Sempre que o front pede algo da API (Request) -> Sempre que a API responde ao front (Response)

/**
* Para configurar a API:
*   Instalar o EXPRESS -> npm install express --save
*   Instalar o CORS    -> npm install cors --save

    Express: dependencia para configurar e utilizar o protocolo HTTP para criar a API
*   Cors: conjunto de permissões que a API tem 
    que ter para que façamos algumas liberações para o front
*
*/

//Import das dependencias para criar a API
const express   = require('express')
const cors      = require('cors')

//Criando um objeto do express parar criar a API
const app = express()

//Configurações do CORS da API
const corsOptions = {
    origin : ['*'], //Configuração de origem da requisição(IP ou Dominio)
    methods: 'GET', //Configuraçõa dos verbos que serão utilizados na API
    allowedHeaders: ['Content-type', 'Authorization'], //Configurações de permissões
                    //Tipo de dados //Autorização de acesso
}

//Aplica as configurações do CORS no app (EXPRESS)
app.use(cors(corsOptions))

//Import do arquivo de funções
const estadosCidades = require('./modulo/uf.js')

//Endpoint para listar os estados
app.get('/v1/senai/estados', function(request, response){
    let estados = estadosCidades.getListaDeEstados()
    response.json(estados)
    response.status(200) //status code 
    //erros internos : 500, erros externos: 400, bem-sucedida: 200
})

//Endpoint para listar os dados de um estado, filtrando por sua sigla
app.get('/v1/senai/dados/estado/:uf', function(request, response){
    // let sigla = request.params.uf
    let sigla = request.query.uf

    let estado = estadosCidades.getDadosEstado(sigla)

    if(estado){
        response.json(estado)
        response.status(200)
    }else{
        response.json({'message':'Nenhum estado foi encontrado'})
        response.status(404)
    }
})

//Endpoint para listar as cidades
app.get('./cidades', function(request, response){
    response.json({"message": "Testando a API de cidades"})
    response.status(200) //Requisição bem sucedida!
})

//Fazer o Start na API (aguardando as requisições)
app.listen(8080, function(){
    console.log('API aguardando novas requisições ...')
})

//http://localhost:4040/cidades

//Endpoint que retorna capital e dados do estado filtrando pela sigla
app.get('/v1/senai/capital/estado/:uf', function(request, response){
    let uf = request.params.uf
    let estado = estadosCidades.getCapitalEstado(uf)

    if(estado){
        response.status(200)
        response.json(estado)
    }else{
        response.status(404)
        response.json({"message": "Capital não encontrada"})
    }
})

//Endpoint que retorna todos os estados de uma região, filtrando pela região
app.get('/v1/senai/estados/regiao/:regiao', function(request, response){
    let regiao = request.params.regiao
    let estados = estadosCidades.getEstadosRegiao(regiao)

    if(estados){
        response.status(200)
        response.json(estados)
    }else{
        response.status(404)
        response.json({message: "Região não encontrada"})
    }
})

//Endpoint que retorna todas as capitais do Brasil (antigas e atual)
app.get('/v1/senai/estados/capital/brasil', function(request, response){
    let estado = estadosCidades.getCapitalPais()

    if(estado){
        response.status(200)
        response.json(estado)  
    }else{
        response .status(404)
        response.json({"message": "Nenhuma Capital encontrada"})
    }
})


app.get('/v1/senai/cidades/estado/:uf', function(request, response){
    let uf = request.params.uf
    let cidades = estadosCidades.getCidades(uf)

    if(cidades){
        response.status(200)
        response.json(cidades)
    }else{
        response.status(404)
        response.json({message: "Nenhuma cidade encontrada"})
    }
})

app.get('/v1/senai/help', function(request, response){

    let docAPI ={
        "api-description" : "API para manipular dados de Estado e Cidades",
        "date"            : "26/04/04",
        "development"     : "Gisele Rodrigues dos Santos",
        "version"         : 1.0,
        "endpoints"       : [
            {
                "router1"    : "/v1/senai/lista/estados",
                "description": "Retorna a Lista de todos os Estados",
            },

            {
                "router2"    : "/v1/senai/dados/estado/sp",
                "description": "Retorna Dados de um Estado, filtrando pela sigla",
            },

            {
                "router3"    : "/v1/senai/capital/estado/sp",
                "description": "Retorna Dados da Capital de um Estado, filtrando pela sigla",
            },

            {
                "router4"    : "/v1/senai/estados/regiao/sudeste",
                "description": "Retorna os Estados, filtrando pela região",
            },

            {
                "router5"    : "/v1/senai/estados/capital/brasil",
                "description": "Retorna os Estados que são ou foram Capitais do Brasil",
            },

            {
                "router6"    : "/v1/senai/cidades/estado/sp",
                "description": "Retorna as Cidades, filtrando pela sigla do Estado",
            }
        ]
    }

    if(docAPI){
        response.status(200)
        response.json(docAPI)
    }else{
        response.status(404)
        response.json("Erro ao tentar encontrar a Documentação da API")
    }
})