const {Users} = require('../models/models')
const ApiError = require('../error/ApiError')

class SettingsController {

  async update (req, res, next) {
    const {id, avatar, email, name} = req.body


    const candidate = await Users.findOne({where: {email}})
    const user = await Users.findOne({where: {id}})

    if (user.email === email) {
      await Users.update(
        {
          avatar,
          email,
          name
        },
        {where: {id}}
      )
    } else {
      if (candidate) {
        return next(ApiError.badRequest('Пользователь с таким email уже существует'))
      }
      await Users.update(
        {
          avatar,
          email,
          name
        },
        {where: {id}}
      )
    }

    return res.json("Data has been updated")
  }
}

module.exports = new SettingsController()