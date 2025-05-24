const express = require('express');
const router = express.Router();

//local: http://localhost:3000
//railway: https://proyectoherbario-production.up.railway.app

router.use('/', require('./planta_routes'));
router.use('/', require('./usuario_routes'));
router.use('/', require('./descubrimiento_routes'));
router.use('/', require('./administrador_routes'));


module.exports = router;