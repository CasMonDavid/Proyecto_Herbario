const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuario_controller');

router.post("/iniciarsesion/investigador", usuarioController.login);
router.put('/usuarioedit/:id', usuarioController.editUserById);
router.post("/iniciarsesion/investigador", usuarioController.login);
router.post("/registrar/user", usuarioController.createUser);
router.get("/usuarioedit/:id", usuarioController.getUserById);
router.get("/administrarusuarios/getall", usuarioController.getAllUsers);

module.exports = router;