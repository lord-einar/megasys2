// routes/inventario.js
const express = require('express');
const capturarUsuario = require('../middlewares/capturarUsuario');
const inventarioController = require('../controllers/inventarioController');

const router = express.Router();

// Aplicamos el middleware para capturar al usuario en todas las rutas de inventario
router.use(capturarUsuario);

router.post('/', inventarioController.crearArticulo);
router.get('/', inventarioController.listarArticulos);
router.put('/:id', inventarioController.actualizarArticulo);
router.delete('/:id', inventarioController.eliminarArticulo);

module.exports = router;
