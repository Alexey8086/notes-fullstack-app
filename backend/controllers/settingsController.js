const {Users} = require('../models/models')
const ApiError = require('../error/ApiError')

class SettingsController {

  async update (req, res) {
    const {id, avatar} = req.body
    try {
      await Users.update({avatar}, {where: {id}})
    } catch (e) {
      console.error(e)
    }

    return res.json("Data has been updated")
  }

}

module.exports = new SettingsController()