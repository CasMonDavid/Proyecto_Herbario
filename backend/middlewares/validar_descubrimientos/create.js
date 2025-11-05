const { body, validationResult } = require("express-validator");

const validar = [
    body('nombre')
        .notEmpty().withMessage("El nombre es obligatorio")
        .isString().withMessage("El nombre debe ser texto")
        .isLength({ max: 100 }).withMessage("El nombre debe ser menor a 100 caracteres"),
    body('latitud')
        .notEmpty().withMessage("La latitud es obligatorio")
        .isDecimal().withMessage("La latitud debe ser un número decimal"),
    body('longitud')
        .notEmpty().withMessage("La longitud es obligatorio")
        .isDecimal().withMessage("La longitud debe ser un número decimal"),
    body('descripcion')
        .notEmpty().withMessage("La descripción es obligatorio")
        .isString().withMessage("La descripción debe ser texto")
        .isLength({ max: 100 }).withMessage("La descripción debe ser menor a 1000 caracteres"),
    body('usuario_id')
        .notEmpty().withMessage("El Id del investigador es obligatorio")
        .isInt().withMessage("El id del investigador debe ser un número"),
    body('relacion')
        .optional()
        .isInt().withMessage("El id de la planta relacionada debe ser un número"),

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