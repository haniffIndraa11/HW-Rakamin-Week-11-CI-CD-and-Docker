const express = require('express')
const app = express()
const router = require('./routes')
const port = 3000
const errorHandler = require('./middleware/errorhandler.js')
require('dotenv').config()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(router)
app.use(errorHandler)
  
module.exports = app