const { bind, resolve } = require('./infra/di/index')
const { UserRepository } = require('./infra/database/memory/user-repository')
const { UserService } = require('./apps/user/service')
const { AuthService } = require('./apps/auth/service')
const { SessionLogin } = require('./api/public/login-strategy')

bind('UserRepository', () => new UserRepository())
bind('LoginStrategy', () => SessionLogin)
bind('UserService', () => new UserService(resolve('UserRepository')))
bind(
  'AuthService',
  () => new AuthService(resolve('UserRepository'), resolve('LoginStrategy'))
)
