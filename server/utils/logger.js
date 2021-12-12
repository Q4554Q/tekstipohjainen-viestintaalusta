const colors = require('colors')

/**
 * Logs the given parameters to the console in white text, unless in test mode.
 * @param  {...any} params Parameters to print.
 */
const info = (...params) => {
	if (process.env.NODE_ENV !== 'test') {
		console.log(...params)
	}
}

/**
 * Logs the given parameters to the console in green text, unless in test mode.
 * @param  {...any} params Parameters to print.
 */
const success = (...params) => {
	if (process.env.NODE_ENV !== 'test') {
		console.log(colors.green(...params))
	}
}

/**
 * Logs the given parameters to the console in red text, unless in test mode.
 * @param  {...any} params Parameters to print.
 */
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