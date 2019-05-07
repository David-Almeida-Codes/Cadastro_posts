const Sequelize = require('sequelize')

	// Conexao com banco de dados
	const sequelize = new Sequelize('postapp', 'root', '2244', {
		host: 'localhost',
		dialect: 'mysql'
    })
    
module.exports = {
    Sequelize,
    sequelize
}