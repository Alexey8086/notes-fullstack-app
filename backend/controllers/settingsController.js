const UserN = require('../models/User')
const ApiError = require('../error/ApiError')

class SettingsController {

  async update (req, res) {
    const {id, avatar} = req.body
    try {
      await UserN.updateOne({id}, {avatar})
      return res.json("Data has been updated")

    } catch (error) {
      console.warn(`ERROR FROM updating settings ---> ${error} `)
    }
  }

}

module.exports = new SettingsController()