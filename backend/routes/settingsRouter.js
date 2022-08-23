const Router = require('express')
const router = new Router()
const SettingsController = require('../controllers/settingsController')
const authMiddleware = require('../middleware/authMiddleware')


router.post('/update', authMiddleware, SettingsController.update)


module.exports = router