const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const middleware = require('./middleware')

// db = require('./db')

const loginRouter = require('./routes/login')
const topicsRouter = require('./routes/topics')

app.use(cors())
app.use(express.static('public'))
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

// Routes
app.use('/api/login', loginRouter)
app.use('/api/topics', topicsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app