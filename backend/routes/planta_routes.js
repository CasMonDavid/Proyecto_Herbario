const express = require('express');
const multer = require("multer");
const path = require("path");
const router = express.Router();
const plantaController = require('../controllers/planta/planta_controller');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "fotos/");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9) + ext;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });

router.get("/plantas/getall", plantaController.getAllPlantas);
router.get("/plantas/getall", plantaController.getAllPlantas);
router.get("/editar/:id", plantaController.editPlantaById);
router.get("/informacion/:id", plantaController.getPlantaById);
router.get("/plantasadmin/getall", plantaController.getAllPlantas);

router.put('/editar/:id', plantaController.editPlantaById);

router.post('/registrarplanta', upload.single("fotografia"), plantaController.createPlanta);

module.exports = router;