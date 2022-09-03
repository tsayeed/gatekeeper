const joi = require('joi')
const { transform } = require('../utils')
const { depends } = require('../../infra/di')

const SignupPostSchema = joi.object({
  email: joi.string().required().email().max(50),
  password: joi.string().required().max(50),
})

const UserResourceConfig = {
  include: ['id', 'email', 'email_verified', 'username', 'created_at'],
  camelCase: true,
}

const SignupResource = {
  url: '/v1/signup',
  post: {
    body: SignupPostSchema,
    dependencies: {
      userService: depends('UserService'),
    },
    async handler(req, res) {
      const userService = req.context.userService
      const user = await userService.createUser(req.body)
      res.status(201).json(transform(user, UserResourceConfig))
    },
  },
}

module.exports = { SignupResource }
