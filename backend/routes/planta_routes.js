const express = require('express');
const router = express.Router();
const plantaCtrl = require('../controllers/planta/planta_controller');

router.get("/plantas/getall", plantaController.getAllPlantas);

module.exports = router;