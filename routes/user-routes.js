const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user-controller');
const isAuthenticateUser = require('../middleware/authentication')

router.get('/', UserController.getUser);
router.post('/register',UserController.registerUser)
router.post('/login', UserController.loginUser)
router.get('/my-profile/:id', isAuthenticateUser, UserController.viewProfile)
router.put('/:id',  UserController.updateProfile)
router.delete('/:id', isAuthenticateUser, UserController.deleteProfile)

module.exports = router;