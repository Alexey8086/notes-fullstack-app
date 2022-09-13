const jwt = require('jsonwebtoken')
const config = require('@/../../backend-config')

module.exports = function (req, res, next) {

  // Example token {token_type token }: Bearer eyJhbGc.iOiJIUzI1NiIsInR5cC.I6IkpXVCJ9
  const token = req.headers.authorization.split(' ')[1] 
  if (token.length < 10) {
    res.status(401).json({message: "Пользователь не авторизован"})
  }

  const decoded = jwt.verify(token, config.jwt_key)
  req.user = decoded
  next()
  
}