const Router = require('express')
const router = new Router()
const mainRouter = require('./mainRouter')
const noteRouter = require('./noteRouter')
const settingsRouter = require('./settingsRouter')
const uploadRouter = require('./uploadRouter')

router.use('/user', mainRouter)
router.use('/notes', noteRouter)
router.use('/settings', settingsRouter)
router.use('/uploads', uploadRouter)

module.exports = router