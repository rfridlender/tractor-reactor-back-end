const router = require('express').Router()
const postsCtrl = require('../controllers/posts.js')
const middleware = require('../middleware/auth.js')

const { decodeUserFromToken, checkAuth } = middleware

/*---------- Public Routes ----------*/
router.get('/', postsCtrl.index)


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.post('/', checkAuth, postsCtrl.create) 
router.put('/:id', checkAuth, postsCtrl.update)
router.delete('/:id', checkAuth, postsCtrl.delete)
router.put('/:id/add-photo', checkAuth, postsCtrl.addPhoto)

router.post('/:id/comments', checkAuth, postsCtrl.addComment)
router.put('/:id/comments/:commentId', checkAuth, postsCtrl.updateComment)
router.delete('/:id/comments/:commentId', checkAuth, postsCtrl.deleteComment)

module.exports = router
