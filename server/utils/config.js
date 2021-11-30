require('dotenv').config()

const PORT = process.env.PORT || 5000

const DB_HOST = process.env.DB_HOST
const DB_USERNAME = process.env.DB_USERNAME
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_NAME = process.env.NODE_ENV === 'test'
	? process.env.TEST_DB_NAME
	: process.env.DB_NAME

const SECRET = process.env.SECRET

module.exports = {
	PORT,
	DB_HOST,
	DB_NAME,
	DB_USERNAME,
	DB_PASSWORD,
	SECRET,
}