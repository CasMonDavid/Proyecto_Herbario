const { body, validationResult } = require("express-validator");

const validar = [
    body('contenido')
        .notEmpty().withMessage("El contenido del comentario es obligatorio")
        .isString().withMessage("El contenido del comentario debe ser texto")
        .isLength({ max: 500 }).withMessage("El contenido del comentario debe ser menor a 500 caracteres"),
    body('id_descubrimiento')
        .notEmpty().withMessage("El Id del descubrimiento es obligatorio")
        .isInt().withMessage("El id del descubrimiento debe ser un número"),
    body('id_investigador')
        .notEmpty().withMessage("El Id del investigador es obligatorio")
        .isInt().withMessage("El id del investigador debe ser un número"),

    // Este middleware final captura los errores
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errores: errors.array() });
        }
        next(); // sigue al controlador si no hay errores
    }
];

module.exports = validar;
