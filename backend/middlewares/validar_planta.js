const { body, validationResult } = require("express-validator");

const validarPlanta = [
    body('nombre_cientifico')
        .notEmpty().withMessage("El nombre científico es obligatorio")
        .isString().withMessage("El nombre científico debe ser texto")
        .isLength({ min: 3 }).withMessage("Debe tener al menos 3 caracteres"),

    body("nombre_comun")
        .optional()
        .isString().withMessage("El nombre común debe ser texto"),

    body("taxon")
        .notEmpty().withMessage("El taxón es obligatorio")
        .isString().withMessage("El taxón debe ser texto"),

    body("familia")
        .notEmpty().withMessage("La familia es obligatoria")
        .isString().withMessage("La familia debe ser texto"),

    body("colector")
        .notEmpty().withMessage("El colector es obligatorio")
        .isString().withMessage("El colector debe ser texto"),

    body("fecha")
        .notEmpty().withMessage("La fecha es obligatoria"),

    body("fecha_registro")
        .optional(),

    body("localidad")
        .notEmpty().withMessage("La localidad es obligatoria"),

    body("habitat")
        .notEmpty().withMessage("El hábitat es obligatorio"),

    body("id_investigador")
        .isInt({ gt: 0 }).withMessage("El id_investigador debe ser un entero mayor que 0"),

    // Este middleware final captura los errores
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errores: errors.array() });
        }
        next(); // sigue al controlador si no hay errores
    }
];

module.exports = validarPlanta;
