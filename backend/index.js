const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')
const varMiddleware = require('./middleware/variables')
const cors = require('cors')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const path = require('path')
const config = require('./config')

const PORT = config.port || 5000
const DB_URI = config.mongoUri || ''

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'uploads')))
app.use(express.urlencoded({extended: true}))
app.use(session({
  secret: config.secret_key,
  resave: false,
  saveUninitialized: false
}))

app.use(varMiddleware)
app.use('/api', router)

if (config.node_env === 'production') {
  console.log('PRODUCTION MODE INABLE')
  app.use('/', express.static(path.join(__dirname, '../frontend/build')))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend', 'build', 'index.html'))
  })
}

app.use(errorHandler)

const start = async () => {
  try {
    await mongoose.connect(DB_URI)
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
  } catch (e) {
    console.warn('INIT APPLICATION WARNING:', e)
  }
}

start ()