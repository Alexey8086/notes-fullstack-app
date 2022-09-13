const Router = require('express')
const router = new Router()
const mainController = require('../controllers/mainController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/registration', mainController.registration)
router.post('/login', mainController.login)
router.post('/getUser', authMiddleware, mainController.getUser)
router.post('/auth', authMiddleware, mainController.check)

module.exports = router