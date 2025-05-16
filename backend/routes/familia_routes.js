const express = require('express');
const router = express.Router();
const familiaController = require('../controllers/planta/caracteristicas/familia_controller');

router.get("/getfamilias", familiaController.getAllFamilias);
router.get("/familia/:id", familiaController.getFamiliasById);

module.exports = router;