const roteador = require('express').Router()

roteador.use('/', (requisicao, resposta) => {
    resposta.send('Ok')
})

module.exports = roteador