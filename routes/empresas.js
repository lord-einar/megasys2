const express = require('express');
const capturarUsuario = require('../middlewares/capturarUsuario');
const empresaController = require('../controllers/empresaController');

const router = express.Router();

// Aplicamos el middleware para capturar al usuario
router.use(capturarUsuario);

router.post('/', empresaController.crearEmpresa);
router.get('/', empresaController.listarEmpresas);
router.get('/:id', empresaController.obtenerEmpresa);
router.put('/:id', empresaController.actualizarEmpresa);
router.delete('/:id', empresaController.eliminarEmpresa);

module.exports = router;
