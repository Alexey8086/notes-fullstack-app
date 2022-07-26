const {Notes} = require('../models/models')
const ApiError = require('../error/ApiError')

class NoteController {

  async create (req, res, next) {
    const {data, userId} = req.body
    await Notes.create({data, userId})

    return res.json("Note has been created")
  }

  async update (req, res, next) {
    const {data, userId} = req.body
    
    await Notes.update({data}, {where: {userId}})
    return res.json("Note has been created")
  }

  async getAllNotes (req, res, next) {
    const {id} = req.query

    const notes = await Notes.findAll({where: {userId: id}})

    // return res.json({ID: id})
    return res.json({notes})
  }
}

module.exports = new NoteController()