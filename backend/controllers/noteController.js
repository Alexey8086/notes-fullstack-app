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
    return res.json("Note has been updated")
  }

  async getAllNotes (req, res, next) {
    const {userId} = req.query
    let notes = await Notes.findAll({where: {userId}})
    // Normalize JSON data from database for client (converting to normal json object without weird symbols like a '/n')
    notes = JSON.parse(notes[0].data)

    // return res.json({ID: id})
    return res.json(notes)
  }

  async getOne (req, res, next) {
    const {id} = req.query
    const note = await Notes.findOne({where: {id}})

    return res.json(note)
  }
}

module.exports = new NoteController()