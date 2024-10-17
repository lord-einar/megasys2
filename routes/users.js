const { Router } = require('express');
const { userGET, userActiveGET, userPOST } = require('../controllers/users');
const { body } = require('express-validator');

const router = Router();

// Validación de datos para crear un usuario
const userValidationRules = [
  body('nombre')
    .notEmpty().withMessage('El nombre es requerido')
    .isString().withMessage('El nombre debe ser una cadena de texto'),
  body('email')
    .isEmail().withMessage('Debe proporcionar un email válido')
    .notEmpty().withMessage('El email no puede estar vacío'),
  body('telefono')
    .notEmpty().withMessage('El teléfono es requerido')
    .isString().withMessage('El teléfono debe ser una cadena de texto'),
  body('active')
    .isBoolean().withMessage('El campo active debe ser un valor booleano')
    .optional(), // Este campo puede omitirse, y se usará el valor por defecto
];

router.get("/", userGET);
router.get("/activas", userActiveGET);

// Validar antes de pasar al controlador
router.post("/", userValidationRules, userPOST);

module.exports = router;
