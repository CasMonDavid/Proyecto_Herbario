const express = require('express');
const router = express.Router();
const usuarioCtrl = require('../controllers/usuario.controller');

router.post("/iniciarsesion/investigador", usuarioController.login);

module.exports = router;