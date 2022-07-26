const Router = require('express')
const router = new Router()
const mainRouter = require('./mainRouter')
// const homeRouter = require('./homeRouter')
const noteRouter = require('./noteRouter')
const settingsRouter = require('./settingsRouter')


router.use('/user', mainRouter)
router.use('/notes', noteRouter)
router.use('/settings', settingsRouter)

module.exports = router