require('dotenv').config()

const PORT = process.env.PORT || 5000
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const SECRET = process.env.SECRET

module.exports = {
	PORT,
	DB_USER,
	DB_PASSWORD,
	SECRET,
}