const express = require('express');
const router = express.Router();
const marcaController = require('../controllers/marcaController');
const capturarUsuario = require('../middlewares/capturarUsuario');

router.use(capturarUsuario);

router.post('/', marcaController.crearMarca);
router.get('/', marcaController.listarMarcas);
router.get('/:id', marcaController.obtenerMarca);
router.put('/:id', marcaController.actualizarMarca);
router.delete('/:id', marcaController.eliminarMarca);

module.exports = router;
