const express = require('express');
const router = express.Router();
const colectorController = require('../controllers/planta/caracteristicas/colector_controller');

router.get("/colector/:id", colectorController.getColectorById);

module.exports = router;