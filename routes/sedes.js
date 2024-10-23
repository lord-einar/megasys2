const express = require('express');
const capturarUsuario = require('../middlewares/capturarUsuario');
const sedeController = require('../controllers/sedeController');

const router = express.Router();

// Aplicamos el middleware de captura de usuario a todas las rutas
router.use(capturarUsuario);

router.post('/', sedeController.crearSede);
router.get('/', sedeController.listarSedes);
router.get('/:id', sedeController.obtenerSede);
router.put('/:id', sedeController.actualizarSede);
router.delete('/:id', sedeController.eliminarSede);

module.exports = router;
