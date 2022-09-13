const Note = require('../models/Note')
const { v4: uuidv4 } = require('uuid')
const config = require('../config')

class NoteController {

  async create (req, res) {
    const {data} = req.body
    const {id} = req.user
    const uid = uuidv4()

    try {

      const note = new Note({id: uid, userId: id, data: data})
      await note.save()
      return res.json("Note has been created")

    } catch (error) {
      console.warn(`ERROR FROM create note ---> ${error} `)
    }
  }

  async update (req, res) {
    const {data, id} = req.body
    
    try {

      await Note.updateOne({id}, {data})
      return res.json("Note has been updated")

    } catch (error) {
      console.warn(`ERROR FROM update note ---> ${error} `)
    }
  }

  async deleteOne (req, res) {
    const {id} = req.query

    if (config.show_logs) console.log('id ------->>>>>> ', id)

    try {
      const response = await Note.deleteOne({id})
      return res.json(response)

    } catch (error) {
      console.warn(`ERROR FROM delete note ---> ${error} `)
    }
  }

  async getAllNotes (req, res) {
    const user = req.user

    try {
      const notes = await Note.find({userId: user.id}).exec()
      return res.json(notes)

    } catch (error) {
      console.warn(`ERROR FROM getting all notes ---> ${error} `)
    }
  }

  async getOne (req, res) {
    const {id} = req.query

    try {
      const note = await Note.findOne({id})
      return res.json(note)
      
    } catch (error) {
      console.warn(`ERROR FROM getting one note ---> ${error} `)
    }
  }
}

module.exports = new NoteController()