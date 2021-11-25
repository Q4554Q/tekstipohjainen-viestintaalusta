const colors = require('colors')

const info = (...params) => {
	if (process.env.NODE_ENV !== 'test') {
		console.log(...params)
	}
}

const success = (...params) => {
	if (process.env.NODE_ENV !== 'test') {
		console.log(colors.green(...params))
	}
}

const error = (...params) => {
	if (process.env.NODE_ENV !== 'test') {
		console.error(colors.red(...params))
	}
}

module.exports = {
	info,
	success,
	error
}