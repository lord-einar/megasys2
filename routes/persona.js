const express = require('express');
const router = express.Router();
const personaController = require('../controllers/personaController');
const capturarUsuario = require('../middlewares/capturarUsuario');

// Aplicar middleware para capturar al usuario
router.use(capturarUsuario);

router.post('/', personaController.crearPersona);
router.get('/', personaController.listarPersonas);
router.get('/:id', personaController.obtenerPersona);
router.put('/:id', personaController.actualizarPersona);
router.delete('/:id', personaController.eliminarPersona);

module.exports = router;
