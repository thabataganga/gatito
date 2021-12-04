// O Sequelize faz a conexão com o banco de dados
const Sequelize = require('sequelize')

// O Conif permite criar um arquivo "config/default.json", trazendo mais produtividade e escalabilidade para o código"
const config = require('config')

// Aqui foi criada uma nova instância que conecta com o banco de dados configurado em "config/default.json"
const instancia = new Sequelize(
    config.get('mysql.banco-de-dados'),
    config.get('mysql.usuario'),
    config.get('mysql.senha'), {
        host: config.get('mysql.host'),
        dialect: 'mysql'
    }
)

module.exports = instancia