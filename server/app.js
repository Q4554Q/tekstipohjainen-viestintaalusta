const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const middleware = require('./middleware')

const loginRouter = require('./routes/login')
const usersRouter = require('./routes/users')
const threadsRouter = require('./routes/threads')

app.use(cors())	// Tarviiko tätä?
app.use(express.static('public'))
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

// Routes
app.use('/api/login', loginRouter)
app.use('/api/users', usersRouter)
app.use('/api/threads', threadsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app