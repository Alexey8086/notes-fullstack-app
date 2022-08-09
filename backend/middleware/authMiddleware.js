const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {

  // The problem - First client (browser) sending security query which is have OPTIONS method
  // and only then sending our origin query with adequate response object
  if (req.method === "OPTIONS") { next() }

  try {

    const token = req.headers.authorization.split(' ')[1] // Example token {token_type token }: Bearer eyJhbGc.iOiJIUzI1NiIsInR5cC.I6IkpXVCJ9
    if (!token) {
      res.status(401).json({message: "Пользователь не авторизован"})
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY)
    req.user = decoded
    next()

  } catch (e) {
    res.status(401).json({message: "Пользователь не авторизован"})
  }
  
}