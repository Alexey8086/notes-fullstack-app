const UserN = require('../models/User')
const bcrypt = require('bcrypt')
const ApiError = require('../error/ApiError')
const getUrl = require('../utils/getUrl')
const generateJwt = require('../utils/generateJwt')


class MainController {

  async registration (req, res, next) {
    const {email, password, name} = req.body

    // if email or password fields is EMPTY returns Error
      if (!email || !password) {
        return next(ApiError.badRequest(`Некорректный email или password BODY: ${req.body}`))
      }

      const candidate = await UserN.findOne({email})

    // if user is EXIST then returns Error
      if (candidate) {
        return next(ApiError.badRequest('Пользователь с таким email уже существует'))
      }

      const avatar = await getUrl()
      const hashPassword = await bcrypt.hash(password, 5)
      const user = new UserN({email, password: hashPassword, name, avatar})
      const userData = await user.save()
      const token = generateJwt(userData.id, userData.email)

      res.json({token})
  }

  async login (req, res, next) {
    
    const {email, password} = req.body
    const user = await UserN.findOne({email})

    if (!user) {
      return next(ApiError.internal('Пользователь не найден'))
    }

    let comparePassword = bcrypt.compareSync(password, user.password)
    if (!comparePassword) {
      return next(ApiError.internal('Указан неверный пароль'))
    }

    const token = generateJwt(user.id, user.email)
    
    // req.session.user = user
    // req.session.isAuthenticated = true
    // req.session.save (err => { if (err) throw err })

    res.json({token})
  }

  async logout (req, res, next) {
    req.session.destroy(() => {
      res.redirect('/login')
    })
    
  }

  async check(req, res, next) {
    const token = generateJwt(req.user.id, req.user.email)
    res.json({token})
  }

  async getUser (req, res, next) {
    const {id} = req.params
    const user = await UserN.findOne({id})
    if (!user) {
      return next(ApiError.badRequest('Упс, у вас проблемы с аутентификацией, мы не можем вас найти'))
    }

    return res.json({user})
  }
}

module.exports = new MainController()