const UserN = require('../models/User')
const ApiError = require('../error/ApiError')

class SettingsController {

  async update (req, res) {
    const {id, avatar, name} = req.body
    try {
      await UserN.updateOne({_id: id}, {avatar, name})
      return res.json("Data has been updated")

    } catch (error) {
      console.warn(`ERROR FROM updating settings ---> ${error} `)
    }
  }

}

module.exports = new SettingsController()