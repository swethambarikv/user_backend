const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user-controller');
const isAuthenticateUser = require('../middleware/authentication')

router.get('/user-table', isAuthenticateUser, UserController.getUser);
router.get('/:id', isAuthenticateUser, UserController.getUserById)
router.get('/', isAuthenticateUser, UserController.getAdmin)
router.post('/register', UserController.registerUser)
router.post('/login', UserController.loginUser)
router.put('/:id', isAuthenticateUser, UserController.updateProfile)
router.delete('/:id', isAuthenticateUser, UserController.deleteProfile)

router.get('/user-role/:id',UserController.getUserRole)

module.exports = router;