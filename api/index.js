const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const config = require('config')
const NaoEncontrado = require('./erros/NaoEncontrado')
const CampoInvalido = require('./erros/CampoInvalido')
const DadosNaoFornecidos = require('./erros/DadosNaoFornecidos')
const ValorNaoSuportado = require('./erros/ValorNaoSuportado')
const formatosAceitos = require('./Serializador').formatosAceitos
const SerializadorErro = require('./Serializador').SerializadorErro

/// Utilizacao do Bodyparser para trabalhar com JSON
app.use(bodyParser.json())

// Verifica o tipo de arquivo
app.use((req, res, proximo) => {
    let formatoRequisitado = req.header('Accept')

    if (formatoRequisitado === '*/*') {
        formatoRequisitado = 'application/json'
    }
    if (formatosAceitos.indexOf(formatoRequisitado) === -1) {
        res.status(406)
        res.end()
        return
    }

    res.setHeader('Content-Type', formatoRequisitado)
    proximo()
})

app.use((requisicao, resposta, proximo) => {
    resposta.set('Access-Control-Allow-Origin', '*')
    proximo()
})

// Altera o Autor da API
app.use((requisicao, resposta, proximo) => {
    resposta.set('X-Powered-By', 'Gatito Petshop')
    proximo()
})

// Declara as rotas
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

    const serializador = new SerializadorErro(
        res.getHeader('Content-Type')
    )
    res.status(status)
    res.send(
        serializador.serializar({
            mensagem: erro.message,
            id: erro.idErro
        })
    )
})


app.listen(config.get('api.porta'), () => {
    console.log("API FUNCIONANDO!")
})