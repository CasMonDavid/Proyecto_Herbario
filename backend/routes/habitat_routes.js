const express = require('express');
const router = express.Router();
const habitatController = require('../controllers/planta/caracteristicas/habitat_controller');

router.get("/habitat/:id", habitatController.getHabitatById);

module.exports = router;