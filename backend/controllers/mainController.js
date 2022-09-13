const UserN = require('../models/User')
const bcrypt = require('bcrypt')
const ApiError = require('../error/ApiError')
const getUrl = require('../utils/getUrl')
const generateJwt = require('../utils/generateJwt')


class MainController {

  async registration (req, res, next) {

    try {
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
      const token = generateJwt(userData.id, userData.email, userData.name, userData.avatar)

      res.json({token})

    } catch (error) {
      console.warn('Error from registration', error)
    }
    
  }

  async login (req, res, next) {

    try {
      const {email, password} = req.body
      const user = await UserN.findOne({email})
  
      if (!user) {
        return next(ApiError.internal('Пользователь не найден'))
      }
  
      let comparePassword = bcrypt.compareSync(password, user.password)
      if (!comparePassword) {
        return next(ApiError.internal('Указан неверный пароль'))
      }
  
      const token = generateJwt(user.id, user.email, user.name, user.avatar)
      
  
      res.json({token})

    } catch (error) {
      console.warn('Error from login', error)
    }
  }


  async check(req, res) {
    const {id, email, name, avatar} = req.user
    const token = generateJwt(id, email, name, avatar)
    res.json({token})
  }

  async getUser (req, res, next) {
    try {
      const user = req.user

      const USER = await UserN.findOne({_id: user.id})

      if (!USER) {
        return next(ApiError.badRequest('Упс, у вас проблемы с аутентификацией, мы не можем вас найти'))
      }
  
      return res.json({user: USER})

    } catch (error) {
      console.warn('Error from getting User from data base', error)
    }

  }
}

module.exports = new MainController()