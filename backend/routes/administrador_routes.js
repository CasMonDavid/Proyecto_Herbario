const express = require('express');
const router = express.Router();
const administradorController = require('../controllers/admin_controller');

router.post("/createAdmin", administradorController.createAdmin);

module.exports = router;