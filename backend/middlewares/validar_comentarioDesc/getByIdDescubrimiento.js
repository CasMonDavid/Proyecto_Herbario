const { param, validationResult } = require("express-validator");

const validar = [
    param('id')
        .notEmpty().withMessage("El Id del descubrimiento es obligatorio")
        .isInt().withMessage("El Id del descubrimiento debe ser un número"),

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