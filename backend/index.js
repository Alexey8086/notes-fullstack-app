require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')
const varMiddleware = require('./middleware/variables')
const cors = require('cors')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const path = require('path')
const { env } = require('process')

const PORT = process.env.PORT || 5000
const DB_URL = process.env.DB_URL || ''

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'uploads')))
app.use(express.urlencoded({extended: true}))
app.use(session({
  secret: env.SECRET_KEY,
  resave: false,
  saveUninitialized: false
}))
app.use(varMiddleware)
// app.use(fileUpload({}))
app.use('/api', router)

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, '../client/build')))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'))
  })
}

app.use(errorHandler)

const start = async () => {
  try {
    await mongoose.connect(DB_URL)
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
  } catch (e) {
    console.warn('INIT APPLICATION WARNING:', e)
  }
}

start ()