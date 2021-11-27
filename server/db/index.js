// Yhteyden muodostus tietokantaan
const mysql = require('mysql')
const util = require('util')
const { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME } = require('../utils/config')

const db = mysql.createConnection({
	host: DB_HOST,
	user: DB_USERNAME,
	password: DB_PASSWORD,
	database: DB_NAME,
})

const query = util.promisify(db.query).bind(db)

module.exports = query