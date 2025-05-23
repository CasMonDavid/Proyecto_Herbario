const express = require('express');
const router = express.Router();

//local: http://localhost:3000
//railway: https://proyectoherbario-production.up.railway.app

router.use('/', require('./planta_routes'));
router.use('/', require('./usuario_routes'));
router.use('/', require('./descubrimiento_routes'));

router.use('/', require('./administrador_routes'));
router.use('/', require('./colector_routes'));
router.use('/', require('./localidad_routes'));
router.use('/', require('./familia_routes'));
router.use('/', require('./habitat_routes'));


module.exports = router;