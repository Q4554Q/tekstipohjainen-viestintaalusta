const query = require('../db')

const getAll = async () => {
	// Hae sivutuslogiikalla n kpl viestiketjuja kaikista aikajärjestykseen järjestetyistä viestiketjuista
	const sql = 'SELECT * FROM threads'

	const rows = await query(sql, [])
	const threads = rows.map(row => {
		return {
			id: row.id,
		}
	})
	return threads
}

const getById = async () => {
	// Hae yhden viestiketjun tiedot, mukaanlukien aloitusviestin tiedot
	return undefined
}

const create = async () => {
	// Luo uuden viestiketjun annetun aloitusviestin kera
	return undefined
}

const addMessage = async () => {
	// Lisää uuden viestin annettuun viestiketjuun
	return undefined
}

module.exports = {
	getAll,
	getById,
	create,
	addMessage,
}