const jwt = require('jsonwebtoken')
const config = require('@/../../backend-config')

const generateJwt = (id, email, name, avatar) => {
    return jwt.sign(
      { id, email, name, avatar},
      config.jwt_key,
      { expiresIn: '10h' }
    )
  }

module.exports = generateJwt