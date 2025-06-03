const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuario_controller');

const connection = require('../config/db');
const bcrypt = require('bcrypt');

router.post("/iniciarsesion/investigador", usuarioController.login);
router.put('/usuarioedit/:id', usuarioController.editUserById);
router.post("/iniciarsesion/investigador", usuarioController.login);
router.post("/registrar/user", usuarioController.createUser);
router.get("/usuarioedit/:id", usuarioController.getUserById);
router.get("/administrarusuarios/getall", usuarioController.getAllUsers);

router.get("/hashearpasswords", async (req, res) => {
    try {
        const [usuarios] = await connection.query("SELECT id_investigador, contrasena FROM investigadores");

        for (const usuario of usuarios) {
            const hashedPassword = await bcrypt.hash(usuario.contrasena, 10);
            await connection.query("UPDATE investigadores SET contrasena = ? WHERE id_investigador = ?",
                [hashedPassword, usuario.id_investigador]);
        }
        res.json({ success: true, message: "Todas las contraseñas han sido hasheadas correctamente" })
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Ocurrio un error al querer hashear las contraseñas", error: error.message })
    }
});

module.exports = router;