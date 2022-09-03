const { Router } = require('express')
const publicRoutes = require('./public')

const router = Router()

router.use('/', publicRoutes)

module.exports = router
