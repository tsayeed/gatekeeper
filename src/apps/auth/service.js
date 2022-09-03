const bcrypt = require('bcrypt')

const InvalidPasswordError = {
  cause: Symbol('InvalidPassword'),
  message: 'The password is invalid',
}

const UserEmailNotFoundError = {
  cause: Symbol('UserEmailNotFound'),
  message: 'User with the email does not exist',
}

const InvalidClaimsError = {
  cause: Symbol('InvalidClaims'),
  message: 'The provided claims is invalid',
}

class AuthService {
  constructor(userRepository, loginStrategy) {
    this.userRepository = userRepository
    this.loginStrategy = loginStrategy
  }

  async authenticate(claims) {
    let user = null

    if (claims.email) {
      user = await this.userRepository.findByEmail(claims.email)
      if (!user) return { error: UserEmailNotFoundError }

      const match = await bcrypt.compare(claims.password, user.password)
      if (!match) return { error: InvalidPasswordError }

      return { user }
    }

    return { error: InvalidClaimsError }
  }

  async login(user, res, done){
    return await this.loginStrategy.login(user, res, done)
  }
}

module.exports = { AuthService }
