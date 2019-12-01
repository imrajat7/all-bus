const express = require('express');
const router = express.Router();

const searchController = require('../controllers/search');

router.post('/', searchController.buses_get_bus);

module.exports = router;