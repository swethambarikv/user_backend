const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/admin-controller');
const {isAuthenticateAdmin} = require('../middleware/authentication')

router.get('/', AdminController.getAdmin);
router.post('/register',AdminController.registerAdmin)
router.post('/login', AdminController.loginAdmin)
router.get('/my-profile/:id',  AdminController.viewProfile)
router.put('/:id',  AdminController.updateProfile)
router.delete('/:id',  AdminController.deleteProfile)

module.exports = router;