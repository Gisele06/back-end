//Import das dependencias para criar a API
const express   = require('express')
const cors      = require('cors')
const bodyParser = require('body-parser')

//Permitindo a utilização do JSON no body das requisições
const bodyParserJSON = bodyParser.json()

//Criando um objeto do express parar criar a API
const app = express()// Import das dependencias para criar a API
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

// Dependências do Swagger
const swaggerUi = require('swagger-ui-express')
const YAML = require('yamljs')
const swaggerDocument = YAML.load('./doc/swagger.yaml') // Ajuste o caminho caso seu yaml esteja em outro local

// Permitindo a utilização do JSON no body das requisições
const bodyParserJSON = bodyParser.json()

// Criando um objeto do express para criar a API
const app = express()

// Configurações do CORS da API
const corsOptions = {
    origin: ['*'], // Configuração de origem da requisição(IP ou Dominio)
    methods: 'GET, POST, PUT, DELETE, OPTIONS', // Configuração dos verbos que serão utilizados na API
    allowedHeaders: ['Content-type', 'Authorization'], // Configurações de permissões
}

// Aplica as configurações do CORS no app (EXPRESS)
app.use(cors(corsOptions))

// Rota para a documentação do Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

// Imports das Controllers
const controllerFilme = require('./controller/filme/controller_filme.js')
const controllerGenero = require('./controller/genero/controller_genero.js')
const controllerClassificacao = require('./controller/classificacao/controller_classificacao.js')
const controllerNacionalidade = require('./controller/nacionalidade/controller_nacionalidade.js')
const controllerPapel = require('./controller/papel/controller_papel.js')
const controllerPessoa = require('./controller/pessoa/controller_pessoa.js')

//-------------------------------------------------------
// ENDPOINTS DE FILME
app.post('/v1/senai/locadora/filme', bodyParserJSON, async function(request, response){
    let dados = request.body
    let contentType = request.headers['content-type']

    let result = await controllerFilme.inserirNovoFilme(dados, contentType)
    console.log(result)

    response.status(result.status_code)
    response.json(result)
})

app.get('/v1/senai/locadora/filme/', async function (request, response){
    let result = await controllerFilme.listarFilmes()
    response.status(result.status_code)
    response.json(result)
})

app.get('/v1/senai/locadora/filme/:id', async function(request, response){
    let id = request.params.id
    let result = await controllerFilme.buscarFilme(id)
    response.status(result.status_code)
    response.json(result)
})

app.put('/v1/senai/locadora/filme/:id', bodyParserJSON, async function(request, response){
    let contentType = request.headers['content-type']
    let id = request.params.id
    let dados = request.body

    let result = await controllerFilme.atualizarFilme(dados, id, contentType)
    response.status(result.status_code)
    response.json(result)
})

app.delete('/v1/senai/locadora/filme/:id', bodyParserJSON, async function(request, response){
    let id = request.params.id
    let result = await controllerFilme.excluirFilme(id)

    response.status(result.status_code)
    response.json(result)
})

//-------------------------------------------------------
// ENDPOINTS DE GÊNERO
app.post('/v1/senai/locadora/genero', bodyParserJSON, async function(request, response){
    let dados = request.body
    let contentType = request.headers['content-type']

    let result = await controllerGenero.inserirNovoGenero(dados, contentType)
    response.status(result.status_code)
    response.json(result)
})

app.get('/v1/senai/locadora/genero', async function(request, response){
    let result = await controllerGenero.listarGenero()
    response.status(result.status_code)
    response.json(result)
})

app.get('/v1/senai/locadora/genero/:id', async function(request, response){
    let id = request.params.id
    let result = await controllerGenero.buscarGenero(id)
    response.status(result.status_code)
    response.json(result)
})

app.put('/v1/senai/locadora/genero/:id', bodyParserJSON, async function(request, response){
    let contentType = request.headers['content-type']
    let id = request.params.id
    let dados = request.body

    let result = await controllerGenero.atualizarGenero(dados, id, contentType)
    response.status(result.status_code)
    response.json(result)
})

app.delete('/v1/senai/locadora/genero/:id', bodyParserJSON, async function(request, response){
    let id = request.params.id
    let result = await controllerGenero.excluirGenero(id)
    response.status(result.status_code)
    response.json(result)
})

//-------------------------------------------------------
// ENDPOINTS DE CLASSIFICAÇÃO
app.post('/v1/senai/locadora/classificacao', bodyParserJSON, async function(request, response){
    let dados = request.body
    let contentType = request.headers['content-type']

    let result = await controllerClassificacao.inserirNovaClassificacao(dados, contentType)
    response.status(result.status_code)
    response.json(result)
})

app.get('/v1/senai/locadora/classificacao', async function(request, response){
    let result = await controllerClassificacao.listarClassificacoes()
    response.status(result.status_code)
    response.json(result)
})

app.get('/v1/senai/locadora/classificacao/:id', async function(request, response){
    let id = request.params.id
    let result = await controllerClassificacao.buscarClassificacao(id)
    response.status(result.status_code)
    response.json(result)
})

app.put('/v1/senai/locadora/classificacao/:id', bodyParserJSON, async function(request, response){
    let contentType = request.headers['content-type']
    let id = request.params.id
    let dados = request.body

    let result = await controllerClassificacao.atualizarClassificacao(dados, id, contentType)
    response.status(result.status_code)
    response.json(result)
})

app.delete('/v1/senai/locadora/classificacao/:id', bodyParserJSON, async function(request, response){
    let id = request.params.id
    let result = await controllerClassificacao.excluirClassificacao(id)
    response.status(result.status_code)
    response.json(result)
})

//-------------------------------------------------------
// ENDPOINTS DE NACIONALIDADE
app.post('/v1/senai/locadora/nacionalidade', bodyParserJSON, async function(request, response){
    let dados = request.body
    let contentType = request.headers['content-type']

    let result = await controllerNacionalidade.inserirNovaNacionalidade(dados, contentType)
    response.status(result.status_code)
    response.json(result)
})

app.get('/v1/senai/locadora/nacionalidade', async function(request, response){
    let result = await controllerNacionalidade.listarNacionalidade()
    response.status(result.status_code)
    response.json(result)
})

app.get('/v1/senai/locadora/nacionalidade/:id', async function(request, response){
    let id = request.params.id
    let result = await controllerNacionalidade.buscarNacionalidade(id)
    response.status(result.status_code)
    response.json(result)
})

app.put('/v1/senai/locadora/nacionalidade/:id', bodyParserJSON, async function(request, response){
    let contentType = request.headers['content-type']
    let id = request.params.id
    let dados = request.body

    let result = await controllerNacionalidade.atualizarNacionalidade(dados, id, contentType)
    response.status(result.status_code)
    response.json(result)
})

app.delete('/v1/senai/locadora/nacionalidade/:id', bodyParserJSON, async function(request, response){
    let id = request.params.id
    let result = await controllerNacionalidade.excluirNacionalidade(id)
    response.status(result.status_code)
    response.json(result)
})

//-------------------------------------------------------
// ENDPOINTS DE PAPEL
app.post('/v1/senai/locadora/papel', bodyParserJSON, async function(request, response){
    let dados = request.body
    let contentType = request.headers['content-type']

    let result = await controllerPapel.inserirNovoPapel(dados, contentType)
    response.status(result.status_code)
    response.json(result)
})

app.get('/v1/senai/locadora/papel', async function(request, response){
    let result = await controllerPapel.listarPapel()
    response.status(result.status_code)
    response.json(result)
})

app.get('/v1/senai/locadora/papel/:id', async function(request, response){
    let id = request.params.id
    let result = await controllerPapel.buscarPapel(id)
    response.status(result.status_code)
    response.json(result)
})

app.put('/v1/senai/locadora/papel/:id', bodyParserJSON, async function(request, response){
    let contentType = request.headers['content-type']
    let id = request.params.id
    let dados = request.body

    let result = await controllerPapel.atualizarPapel(dados, id, contentType)
    response.status(result.status_code)
    response.json(result)
})

app.delete('/v1/senai/locadora/papel/:id', bodyParserJSON, async function(request, response){
    let id = request.params.id
    let result = await controllerPapel.excluirPapel(id)
    response.status(result.status_code)
    response.json(result)
})

//-------------------------------------------------------
// ENDPOINTS DE PESSOA
app.post('/v1/senai/locadora/pessoa', bodyParserJSON, async function(request, response){
    let dados = request.body
    let contentType = request.headers['content-type']

    let result = await controllerPessoa.inserirNovaPessoa(dados, contentType)
    response.status(result.status_code)
    response.json(result)
})

app.get('/v1/senai/locadora/pessoa', async function(request, response){
    let result = await controllerPessoa.listarPessoa()
    response.status(result.status_code)
    response.json(result)
})

app.get('/v1/senai/locadora/pessoa/:id', async function(request, response){
    let id = request.params.id
    let result = await controllerPessoa.buscarPessoa(id)
    response.status(result.status_code)
    response.json(result)
})

app.put('/v1/senai/locadora/pessoa/:id', bodyParserJSON, async function(request, response){
    let id = request.params.id
    let dados = request.body
    let contentType = request.headers['content-type']

    let result = await controllerPessoa.atualizarPessoa(dados, id, contentType)
    response.status(result.status_code)
    response.json(result)
})

app.delete('/v1/senai/locadora/pessoa/:id', async function(request, response){
    let id = request.params.id
    let result = await controllerPessoa.excluirPessoa(id)
    response.status(result.status_code)
    response.json(result)
})

app.listen(8080, function(){
    console.log('API aguardando novas requisições ...')
})

//Configurações do CORS da API
const corsOptions = {
    origin : ['*'], //Configuração de origem da requisição(IP ou Dominio)
    methods: 'GET, POST, PUT, DELETE, OPTIONS', //Configuraçõa dos verbos que serão utilizados na API
    allowedHeaders: ['Content-type', 'Authorization'], //Configurações de permissões
                    //Tipo de dados //Autorização de acesso
}

//Aplica as configurações do CORS no app (EXPRESS)
app.use(cors(corsOptions))

const controllerFilme = require('./controller/filme/controller_filme.js')
const controllerClassificacao = require('./controller/classificacao/controller_classificacao.js')
const controllerNacionalidade = require('./controller/nacionalidade/controller_nacionalidade.js')
const controllerPapel = require('./controller/papel/controller_papel.js')

//-------------------------------------------------------
//ENDPOINTS 
app.post('/v1/senai/locadora/filme', bodyParserJSON, async function(request, response){
    //Recebendo o body da requisição
    let dados = request.body

    //Recebendo o tipo de dados da requisição para validar se é JSON
    let contentType = request.headers['content-type']

    //Chama a função de inserir e encaminha os dados do filme e o contentType
    let result = await controllerFilme.inserirNovoFilme(dados, contentType)
    console.log(result)

    response.status(result.status_code)
    response.json(result)

})

app.get('/v1/senai/locadora/filme/', async function (request, response){
    let result = await controllerFilme.listarFilmes( )
    response.status(result.status_code)
    response.json(result)
})

app.get('/v1/senai/locadora/filme/:id', async function(request, response){
    //Recebe o ID do filme via parametro
    let id = request.params.id

    let result = await controllerFilme.buscarFilme(id)
    response.status(result.status_code)
    response.json(result)
})

app.put('/v1/senai/locadora/filme/:id', bodyParserJSON, async function(request, response){

    //Recebe o content-type da requisição, para validar se é JSON
    let contentType = request.headers['content-type']
    //Recebe o ID do registro a ser atualizado
    let id          = request.params.id
    //Receber os dados do body, que serão modificados no BD
    let dados       = request.body

    //Chama a função para atualizar o filme, devemos encaminhar as 3 variáveis na mesma sequência
    //que a função foi criada na controller
    let result = await controllerFilme.atualizarFilme(dados, id, contentType)

    response.status(result.status_code)
    response.json(result)

})

app.delete('/v1/senai/locadora/filme/:id', bodyParserJSON, async function(request, response){
    let id          = request.params.id

    let result = await controllerFilme.excluirFilme(id)

    response.status(result.status_code)
    response.json(result)
})

//-------------------------------------------------------
//Import do arquivo de rotas do gênero

const generoRouter = require('./routes/genero.router.js')
app.use('/v1/senai/locadora/genero', cors(), generoRouter)

//-------------------------------------------------------
//ENDPOINTS DE CLASSIFICAÇÃO
app.post('/v1/senai/locadora/classificacao', bodyParserJSON, async function(request, response){

    let dados = request.body

    let contentType = request.headers['content-type']

    let result = await controllerClassificacao.inserirNovaClassificacao(dados, contentType)

    response.status(result.status_code)
    response.json(result)

})

app.get('/v1/senai/locadora/classificacao', async function(request, response){

    let result = await controllerClassificacao.listarClassificacoes()

    response.status(result.status_code)
    response.json(result)

})

app.get('/v1/senai/locadora/classificacao/:id', async function(request, response){

    let id = request.params.id

    let result = await controllerClassificacao.buscarClassificacao(id)

    response.status(result.status_code)
    response.json(result)

})

app.put('/v1/senai/locadora/classificacao/:id', bodyParserJSON, async function(request, response){

    let contentType = request.headers['content-type']

    let id = request.params.id

    let dados = request.body

    let result = await controllerClassificacao.atualizarClassificacao(dados, id, contentType)

    response.status(result.status_code)
    response.json(result)

})

app.delete('/v1/senai/locadora/classificacao/:id', bodyParserJSON, async function(request, response){

    let id = request.params.id

    let result = await controllerClassificacao.excluirClassificacao(id)

    response.status(result.status_code)
    response.json(result)

})

//-------------------------------------------------------
//ENDPOINTS DE NACIONALIDADE
 app.post('/v1/senai/locadora/nacionalidade', bodyParserJSON, async function(request, response){

    let dados = request.body

    let contentType = request.headers['content-type']

    let result = await controllerNacionalidade.inserirNovaNacionalidade(dados, contentType)

    response.status(result.status_code)
    response.json(result)

})

app.get('/v1/senai/locadora/nacionalidade', async function(request, response){

    let result = await controllerNacionalidade.listarNacionalidade()

    response.status(result.status_code)
    response.json(result)

})

app.get('/v1/senai/locadora/nacionalidade/:id', async function(request, response){

    let id = request.params.id

    let result = await controllerNacionalidade.buscarNacionalidade(id)

    response.status(result.status_code)
    response.json(result)

})

app.put('/v1/senai/locadora/nacionalidade/:id', bodyParserJSON, async function(request, response){

    let contentType = request.headers['content-type']

    let id = request.params.id

    let dados = request.body

    let result = await controllerNacionalidade.atualizarNacionalidade(dados, id, contentType)

    response.status(result.status_code)
    response.json(result)

})

app.delete('/v1/senai/locadora/nacionalidade/:id', bodyParserJSON, async function(request, response){

    let id = request.params.id

    let result = await controllerNacionalidade.excluirNacionalidade(id)

    response.status(result.status_code)
    response.json(result)

})

//-------------------------------------------------------
//ENDPOINTS DE PAPEL

app.post('/v1/senai/locadora/papel', bodyParserJSON, async function(request, response){

    let dados = request.body

    let contentType = request.headers['content-type']

    let result = await controllerPapel.inserirNovoPapel(dados, contentType)

    response.status(result.status_code)
    response.json(result)

})

app.get('/v1/senai/locadora/papel', async function(request, response){

    let result = await controllerPapel.listarPapel()

    response.status(result.status_code)
    response.json(result)

})

app.get('/v1/senai/locadora/papel/:id', async function(request, response){

    let id = request.params.id

    let result = await controllerPapel.buscarPapel(id)

    response.status(result.status_code)
    response.json(result)

})

app.put('/v1/senai/locadora/papel/:id', bodyParserJSON, async function(request, response){

    let contentType = request.headers['content-type']

    let id = request.params.id

    let dados = request.body

    let result = await controllerPapel.atualizarPapel(dados, id, contentType)

    response.status(result.status_code)
    response.json(result)

})

app.delete('/v1/senai/locadora/papel/:id', bodyParserJSON, async function(request, response){

    let id = request.params.id

    let result = await controllerPapel.excluirPapel(id)

    response.status(result.status_code)
    response.json(result)

})

//-------------------------------------------------------
//ENDPOINTS DE PESSOA
app.post('/v1/senai/locadora/pessoa', bodyParserJSON, async function(request, response){

    let dados = request.body

    let contentType = request.headers['content-type']

    let result = await controllerPessoa.inserirNovaPessoa(dados, contentType)

    response.status(result.status_code)
    response.json(result)

})

app.get('/v1/senai/locadora/pessoa', async function(request, response){

    let result = await controllerPessoa.listarPessoa()

    response.status(result.status_code)
    response.json(result)

})

app.get('/v1/senai/locadora/pessoa/:id', async function(request, response){

    let id = request.params.id

    let result = await controllerPessoa.buscarPessoa(id)

    response.status(result.status_code)
    response.json(result)

})

app.put('/v1/senai/locadora/pessoa/:id', bodyParserJSON, async function(request, response){

    let id = request.params.id

    let dados = request.body

    let contentType = request.headers['content-type']

    let result = await controllerPessoa.atualizarPessoa(dados, id, contentType)

    response.status(result.status_code)
    response.json(result)

})

app.delete('/v1/senai/locadora/pessoa/:id', async function(request, response){

    let id = request.params.id

    let result = await controllerPessoa.excluirPessoa(id)

    response.status(result.status_code)
    response.json(result)

})

app.listen(8080, function(){
    console.log('API aguardando novas requisições ...')
})