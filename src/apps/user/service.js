class UserExistException extends Error {
  constructor(conflict) {
    super()
    this.conflict = conflict
  }
}

class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository
  }
  async createUser(userData) {
    if (this.userRepository.exist(userData.email)) {
      throw new UserExistException('email')
    }
    return await this.userRepository.save(userData)
  }
}

module.exports = { UserService }
