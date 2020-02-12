const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check-auth');
const BusController = require('../controllers/bus');

router.post('/', checkAuth, BusController.buses_create_bus);
router.get('/',checkAuth, BusController.buses_get_all);
// checkauth removed from get bus
router.get('/:busId', BusController.buses_get_bus);
router.delete('/:busId', checkAuth, BusController.buses_delete_bus);

module.exports = router;