const express = require('express');
const router = express.Router();
const tipoArticuloController = require('../controllers/tipoArticuloController');
const capturarUsuario = require('../middlewares/capturarUsuario');

router.use(capturarUsuario);

router.post('/', tipoArticuloController.crearTipoArticulo);
router.get('/', tipoArticuloController.listarTipoArticulos);
router.get('/:id', tipoArticuloController.obtenerTipoArticulo);
router.put('/:id', tipoArticuloController.actualizarTipoArticulo);
router.delete('/:id', tipoArticuloController.eliminarTipoArticulo);

module.exports = router;
