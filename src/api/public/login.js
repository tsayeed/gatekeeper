const joi = require('joi')
const { transform } = require('../utils')
const { depends } = require('../../infra/di')

const LoginPostSchema = joi.object({
  email: joi.string().required().email().max(50),
  password: joi.string().required().max(50),
})

const LoginResource = {
  url: '/v1/login',
  post: {
    body: LoginPostSchema,
    dependencies: {
      authService: depends('AuthService'),
    },
    async handler(req, res, next) {
      const authService = req.context.authService
      const { user, error } = await authService.authenticate(req.body)
      if (error) {
        res.status(401).json({ error: error.message })
      }
      await authService.login(user, res, next)
      res.status(200).send()
    },
  },
}

module.exports = { LoginResource }
