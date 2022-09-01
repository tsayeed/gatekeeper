require('dotenv').config()

const config = require('./src/config')
const { app } = require('./src/server')

app.listen(config.PORT, config.HOST, () => {
  console.log(`Server listening at ${config.HOST}:${config.PORT}`)
})
