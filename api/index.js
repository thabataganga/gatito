const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const config = require('config')

/// Utilizacao do Bodyparser para trabalhar com JSON
app.use(bodyParser.json())

// Declarar a primeira requisicao
const roteador = require('./rotas/fornecedores')
app.use('/api/fornecedores', roteador)

app.listen(config.get('api.porta'), () => {
    console.log("API FUNCIONANDO!")
})