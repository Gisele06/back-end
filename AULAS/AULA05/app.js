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
    let sigla = request.params.uf
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
app.listen(4040, function(){
    console.log('API aguardando novas requisições ...')
})

//http://localhost:4040/cidades
