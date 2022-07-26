const Router = require('express')
const router = new Router()
const noteController = require('../controllers/noteController')
const authMiddleware = require('../middleware/authMiddleware')

router.get('/all',  noteController.getAllNotes)
router.post('/create', authMiddleware, noteController.create)
router.post('/update:id', authMiddleware, noteController.update)
// router.get('/:id', noteController.getOne)


module.exports = router