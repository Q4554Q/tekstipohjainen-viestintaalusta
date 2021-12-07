// Yhteyden muodostus tietokantaan
const mysql = require('mysql')
const util = require('util')
const { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME } = require('../utils/config')

const conn = mysql.createPool({
	host: DB_HOST,
	user: DB_USERNAME,
	password: DB_PASSWORD,
	database: DB_NAME,
	connectionLimit: 10,
})

const query = util.promisify(conn.query).bind(conn)

module.exports = {
	conn,
	query,
}