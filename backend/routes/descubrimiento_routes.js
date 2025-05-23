const express = require('express');
const multer = require("multer");
const path = require("path");
const router = express.Router();
const descubrimientosController = require('../controllers/descubrimientos_controller');

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

router.post("/descubrimientos/publicar", upload.single("fotografia"), descubrimientosController.createPost);

router.put("/descubrimientos/editar/:id", descubrimientosController.editPost);

router.delete("/descubrimientos/eliminar/:id", descubrimientosController.deletePost);