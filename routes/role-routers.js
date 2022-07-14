const express = require('express');
const router = express.Router();
const RoleController = require('../controllers/role-controller')

router.get('/', RoleController.getRole)
router.get('/:id', RoleController.getRoleById)

router.post('/',RoleController.addRole)

module.exports = router