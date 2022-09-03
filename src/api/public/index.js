const { Router } = require('express')
const { SignupResource } = require('./signup')
const { registerResource } = require('../utils')
const { LoginResource } = require('./login')

const router = Router({ mergeParams: true })

registerResource(router, SignupResource)
registerResource(router, LoginResource)

module.exports = router
