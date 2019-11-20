const express = require('express');
const router = express.Router();

const AdminController = require('../controllers/admin');
const checkAuth = require('../middleware/check-auth');

router.get('',checkAuth ,AdminController.admin_listall);

module.exports = router;

