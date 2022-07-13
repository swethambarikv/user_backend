const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user-controller');
const { isAuthenticateUser } = require('../middleware/authentication')

router.get('/', UserController.getUser);
router.get('/:id', UserController.getUserById)
router.post('/register', UserController.registerUser)
router.post('/login', UserController.loginUser)
router.get('/my-profile/:id', UserController.viewProfile)
router.put('/:id', UserController.updateProfile)
router.delete('/:id', UserController.deleteProfile)

module.exports = router;