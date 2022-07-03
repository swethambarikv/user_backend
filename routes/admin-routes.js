const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/admin-controller');

router.get('/', AdminController.getAdmin);
router.get('/:id', AdminController.getAdminId);
router.post('/', AdminController.addAdmin);
router.put('/:id', AdminController.updateAdmin);
router.delete('/:id', AdminController.deleteAdmin);


module.exports = router;