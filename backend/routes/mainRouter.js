const Router = require('express')
const router = new Router()
const mainController = require('../controllers/mainController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/registration', mainController.registration)
router.post('/login', mainController.login)
// router.get('/logout', mainController.logout)
router.get('/getUser/:id', mainController.getUser)

router.post('/auth', authMiddleware, mainController.check)

module.exports = router