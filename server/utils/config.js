require('dotenv').config()
const colors = require('colors')

const PORT = process.env.PORT || 5000

const DB_HOST = process.env.DB_HOST
const DB_USERNAME = process.env.DB_USERNAME
const DB_PASSWORD = process.env.DB_PASSWORD

if (!process.env.DB_NAME || !DB_HOST || !DB_USERNAME || !DB_PASSWORD) {
	console.log(colors.red('Anna tietokannan tiedot .env-tiedostoon: DB_HOST, DB_USERNAME, DB_PASSWORD ja DB_NAME\n'))
	process.exit(1)
}
const DB_NAME = process.env.NODE_ENV === 'test'
	? process.env.DB_NAME + '_testit'
	: process.env.DB_NAME

if (!process.env.SECRET) {
	console.log(colors.red('Anna JsonWebToken salausavain .env-tiedostoon: SECRET=...\n'))
	process.exit(1)
}
const SECRET = process.env.SECRET

module.exports = {
	PORT,
	DB_HOST,
	DB_NAME,
	DB_USERNAME,
	DB_PASSWORD,
	SECRET,
}