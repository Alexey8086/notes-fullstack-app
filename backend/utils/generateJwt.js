const jwt = require('jsonwebtoken')

const generateJwt = (id, email, name, avatar) => {
    return jwt.sign(
      { id, email, name, avatar},
      process.env.SECRET_KEY,
      { expiresIn: '10h' }
    )
  }

module.exports = generateJwt