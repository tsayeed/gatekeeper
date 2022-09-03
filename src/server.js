const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const apiRoutes = require('./api')

require('./bindings')

const app = express()

app.use(morgan('combined'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use('/api', apiRoutes)
app.get('/get-me', (req, res) => res.json({ success: true }))

app.use((err, req, res, next) => {
  console.log(err)
  return res
    .status(500)
    .json({ error: 'Server encountered an unexpected error' })
})

module.exports = { app }
