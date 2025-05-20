const express = require('express');
const router = express.Router();
const localidadController = require('../controllers/planta/caracteristicas/localidad_controller');

router.get("/localidad/:id", localidadController.getLocalidadById);

module.exports = router;