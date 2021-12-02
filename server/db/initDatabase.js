const mysql = require('mysql')
const { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME } = require('../utils/config')
const fs = require('fs')
const path = require('path')
const colors = require('colors')

const queries = fs.readFileSync(path.resolve(__dirname, './createDatabase.sql'))
	.toString()
	.split('viestintäalusta')
	.join(DB_NAME)

const conn = mysql.createConnection({
	host: DB_HOST,
	user: DB_USERNAME,
	password: DB_PASSWORD,
	multipleStatements: true
})

conn.connect(function (err) {
	if (err) throw err
	conn.query(queries, function (err) {
		if (err) throw err
		console.log(colors.green(`Tietokanta '${DB_NAME}' luotu!\n`))
		process.exit()
	})
})