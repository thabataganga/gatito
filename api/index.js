const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const config = require('config')
const NaoEncontrado = require('./erros/NaoEncontrado')
const CampoInvalido = require('./erros/CampoInvalido')
const DadosNaoFornecidos = require('./erros/DadosNaoFornecidos')
const ValorNaoSuportado = require('./erros/ValorNaoSuportado')

/// Utilizacao do Bodyparser para trabalhar com JSON
app.use(bodyParser.json())

// Declarar a primeira requisicao
const roteador = require('./rotas/fornecedores')
app.use('/api/fornecedores', roteador)

// Midleware para o tratamento de erros
app.use((erro, req, res, proximo) => {
    let status = 500
    if (erro instanceof NaoEncontrado) {
        status = 404
    }

    if (erro instanceof CampoInvalido || erro instanceof DadosNaoFornecidos) {
        status = 400
    }

    if (erro instanceof ValorNaoSuportado) {
        status = 406
    }
    res.status(status)
    res.send(
        JSON.stringify({
            mensagem: erro.message,
            id: erro.idErro
        })
    )
})


app.listen(config.get('api.porta'), () => {
    console.log("API FUNCIONANDO!")
})