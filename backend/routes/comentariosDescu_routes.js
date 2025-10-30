const express = require('express');
const router = express.Router();

const comentariosDescuController = require('../controllers/comentariosDescu_controller');

//Validaciones
const validarComentariosDescuCrear = require('../middlewares/validar_comentarioDesc/crear');
const validarComentariosDescuGetById = require('../middlewares/validar_comentarioDesc/get_by_id');
const validarComentariosDescuUpdate = require('../middlewares/validar_comentarioDesc/update');
const validarComentariosDescuGetByIdDescubrimiento = require('../middlewares/validar_comentarioDesc/getByIdDescubrimiento');
const validarComentariosDescuDelete = require('../middlewares/validar_comentarioDesc/delete');

// localhost:4000/descubrimiento/comentario/getbyid/:id
router.get("/getbyid/:id", validarComentariosDescuGetById, comentariosDescuController.getById);
// localhost:4000/descubrimiento/comentario/getByIdDescubrimiento/:id
router.get("/getbyiddescubrimiento/:id", validarComentariosDescuGetByIdDescubrimiento, comentariosDescuController.getByIdDescubrimiento);

// localhost:4000/descubrimiento/comentario/crear
router.post("/crear", validarComentariosDescuCrear, comentariosDescuController.create);

// localhost:4000/descubrimiento/comentario/actualizar
router.put("/actualizar", validarComentariosDescuUpdate, comentariosDescuController.update);

// localhost:4000/descubrimiento/comentario/eliminar
router.delete("/eliminar", validarComentariosDescuDelete, comentariosDescuController.delete);

module.exports = router;