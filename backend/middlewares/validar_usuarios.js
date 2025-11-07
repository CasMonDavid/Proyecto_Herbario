const { body, validationResult } = require("express-validator");

const validarRegistro = [
    body('nombre')
        .optional()
        .matches(/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/).withMessage("El nombre solo puede contener letras y espacios")
        .isString().withMessage("El nombre debe ser texto")
        .isLength({ min: 3 }).withMessage("Debe tener al menos 3 caracteres"),

    body('correo_electronico')
        .notEmpty().withMessage("El correo es obligatorio")
        .isEmail().withMessage("Formato de correo no valido"),
    
    body('contrasena')
        .optional()
        .isLength({ min: 6 }).withMessage("Debe tener al menos 6 caracteres"),

    // Este middleware final captura los errores
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errores: errors.array() });
        }
        next(); // sigue al controlador si no hay errores
    }
];

module.exports = validarRegistro;
