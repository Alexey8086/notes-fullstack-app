const Router = require('express')
const router = new Router()
const fs = require('fs')
const multer = require('multer')
const authMiddleware = require('../middleware/authMiddleware')


const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    if (!fs.existsSync('uploads/imgs')) {
      fs.mkdirSync('uploads/imgs')
    }

    cb(null, 'uploads/imgs')
  },

  filename: (_, file, cb) => {
    cb(null, file.originalname)
  },
})

const upload = multer({ storage })

router.post('/imgs', authMiddleware, upload.single('image'), (req, res) => {
  res.json({
    url: `/imgs/${req.file.originalname}`,
  })
})

module.exports = router