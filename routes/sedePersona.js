const express = require('express');
const router = express.Router();
const sedePersonaController = require('../controllers/sedePersonaController');
const capturarUsuario = require('../middlewares/capturarUsuario');

// Aplicar middleware para capturar usuario
router.use(capturarUsuario);

router.post('/', sedePersonaController.asignarPersona);
router.get('/', sedePersonaController.listarAsignaciones);
router.get('/:id', sedePersonaController.obtenerAsignacion);
router.put('/:id', sedePersonaController.actualizarAsignacion);
router.delete('/:id', sedePersonaController.eliminarAsignacion);

module.exports = router;
