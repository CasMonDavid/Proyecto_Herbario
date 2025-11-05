const express = require('express');
const multer = require("multer");
const path = require("path");
const router = express.Router();
const descubrimientosController = require('../controllers/descubrimientos_controller');

const validar_create = require('../middlewares/validar_descubrimientos/create');
const validar_update = require('../middlewares/validar_descubrimientos/update');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "fotos/descubrimientos/");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9) + ext;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });

router.get("/descubrimientos", descubrimientosController.getPostAll);
router.get("/descubrimientos/:id", descubrimientosController.getPostById);

router.post("/descubrimientos/publicar", upload.single("fotografia"), validar_create, descubrimientosController.createPost);

router.put("/descubrimientos/editar/:id", upload.single("fotografia"), validar_update, descubrimientosController.updatePost);

router.delete("/descubrimientos/eliminar/:id", descubrimientosController.deletePost);

module.exports = router;