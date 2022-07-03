const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user-controller');

router.get('/', UserController.getUser);
router.get('/:id', UserController.getSingleId);
router.post('/', UserController.addUser);
router.put('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);


module.exports = router;