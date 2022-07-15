const express = require('express');
const router = express.Router();
const RoleController = require('../controllers/role-controller')

router.get('/', RoleController.getRole)
// router.get('/drop', RoleController.getRoleDrop)
router.get('/:id', RoleController.getRoleById)
router.put('/:id',RoleController.updateRole)
router.post('/',RoleController.addRole)
router.delete('/:id',RoleController.deleteRole)

module.exports = router