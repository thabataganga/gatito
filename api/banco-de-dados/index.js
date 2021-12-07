const Sequelize = require('sequelize')

//Buscar os dados do BD no config/default.json
const config = require('config')

const instancia = new Sequelize(
    config.get('mysql.banco-de-dados'),
    config.get('mysql.usuario'),
    config.get('mysql.senha'), {
        host: config.get('mysql.host'),
        dialect: 'mysql'
    }
)

module.exports = instancia