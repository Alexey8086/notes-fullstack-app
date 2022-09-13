const {Schema, model} = require('mongoose')


const Note = new Schema({
    id: {
        type: String,
        require: true,
        unique: true
    },
    userId: {
        type: String,
        require: true
    },
    data: {
        type: Object,
        require: true
    }
})

// первый параметр - название модели, второй - схема модели
module.exports = model('Note', Note)