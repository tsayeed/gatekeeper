const bcrypt = require('bcrypt')
const crypto = require('crypto')

const users = [
  {
    email: 'randomuser@gmail.com',
    password: bcrypt.hashSync('password123', 10),
    email_verified: true,
  },
  {
    email: 'randomuser1@gmail.com',
    password: bcrypt.hashSync('password123', 10),
    email_verified: false,
  },
]

class UserRepository {
  exist(email) {
    return users.findIndex((user) => user.email === email) !== -1
  }

  async save(user) {
    const userData = {
      id: crypto.randomUUID(),
      email: user.email,
      username: user.email.split('@')[0],
      password: await bcrypt.hash(user.password, 10),
      email_verified: false,
      created_at: new Date(),
    }
    users.push(userData)
    return userData
  }

  async findByEmail(email) {
    return users.find((u) => u.email === email)
  }
}

module.exports = { UserRepository }
