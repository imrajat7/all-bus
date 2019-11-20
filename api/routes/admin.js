const express = require('express');
const router = express.Router();

const AdminController = require('../controllers/admin');
const checkAuth = require('../middleware/check-auth');

router.get('',checkAuth ,AdminController.admin_listall);
router.get('/:userId',checkAuth ,AdminController.users_get_user);
router.delete('/:userId',checkAuth ,AdminController.users_delete_user);

module.exports = router;

