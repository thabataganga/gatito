const roteador = require('express').Router()
const TabelaFornecedor = require('./TabelaFornecedor')

// Declarar a primeira requisicao
roteador.get('/', async(req, res) => {
    const resultados = await TabelaFornecedor.listar()
    res.send(
        JSON.stringify(resultados)
    )
})

roteador.use('/', (req, res) => {

})

module.exports = roteador