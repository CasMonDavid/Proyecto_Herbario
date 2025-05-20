const express = require('express');
const router = express.Router();
const plantaController = require('../controllers/planta/planta_controller');

router.get("/plantas/getall", plantaController.getAllPlantas);
router.get("/plantas/getall", plantaController.getAllPlantas);
router.get("/editar/:id", plantaController.editPlantaById);
router.get("/informacion/:id", plantaController.getPlantaById);
router.get("/plantasadmin/getall", plantaController.getAllPlantas);
router.put('/editar/:id', plantaController.editPlantaById);
router.post('/registrarplanta', plantaController.createPlanta);

module.exports = router;