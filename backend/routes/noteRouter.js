const Router = require('express')
const router = new Router()
const noteController = require('../controllers/noteController')
const authMiddleware = require('../middleware/authMiddleware')

router.get('/all/:userId',  authMiddleware, noteController.getAllNotes)
router.post('/create', authMiddleware, noteController.create)
router.post('/update/:id', authMiddleware, noteController.update)
router.get('/delete', authMiddleware, noteController.deleteOne)
router.get('/:id', authMiddleware, noteController.getOne)


module.exports = router