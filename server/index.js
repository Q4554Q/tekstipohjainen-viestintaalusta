const app = require('./app')
const http = require('http')
const { PORT } = require('./utils/config')
const colors = require('colors')

const server = http.createServer(app)

server.listen(PORT, () => {
	console.log(colors.green(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))
})