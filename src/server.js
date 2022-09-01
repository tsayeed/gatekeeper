const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

app.use(morgan('combined'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use((err, req, res, next) => {
  return res
    .status(500)
    .json({ error: 'Server encountered an unexpected error' })
})

module.exports = { app }
