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

module.exports = router
