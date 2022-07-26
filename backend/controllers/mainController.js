const {Users} = require('../models/models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const ApiError = require('../error/ApiError')

const generateJwt = (id, email) => {
  return jwt.sign(
    {id, email},
    process.env.SECRET_KEY,
    {expiresIn: '24h'}
  )
}

class MainController {
  
  test (req, res) {
    res.json('Hello from mainController')
  }

  async registration (req, res, next) {
    const {email, password, name, avatar} = req.body
      if (!email || !password) {
        return next(ApiError.badRequest(`Некорректный email или password BODY: ${req.body}`))
      }

      const candidate = await Users.findOne({where: {email}})

      if (candidate) {
        return next(ApiError.badRequest('Пользователь с таким email уже существует'))
      }

      const hashPassword = await bcrypt.hash(password, 5)
      const user = await Users.create({email, password: hashPassword, name, avatar})
      // const token = generateJwt(user.id, user.email)
      res.json({success: true})
    }

  async login (req, res, next) {
    

    const {email, password} = req.body
    const user = await Users.findOne({where: {email}})

    if (!user) {
      return next(ApiError.internal('Пользователь не найден'))
    }

    let comparePassword = bcrypt.compareSync(password, user.password)
    if (!comparePassword) {
      return next(ApiError.internal('Указан неверный пароль'))
    }

    req.session.user = user
    req.session.isAuthenticated = true

    req.session.save (err => {
      if (err) throw err
      res.redirect('/')
    })

    res.json({success: true})
  }

  async logout (req, res, next) {
    req.session.destroy(() => {
      res.redirect('/login')
    })
    

  }

  // async check(req, res, next) {
  //   const token = generateJwt(req.user.id, req.user.email)
  //   return res.json({token})
  // }

  async getUser (req, res, next) {
    const {id} = req.query
    const user = await Users.findOne({where: {id: id}})
    if (!user) {
      return next(ApiError.badRequest('Упс, у вас проблемы с аутентификацией, мы не можем вас найти'))
    }

    return res.json({user})
  }
}

module.exports = new MainController()