const express = require('express');
const router = express.Router();
const remitoController = require('../controllers/remitoController');
const capturarUsuario = require('../middlewares/capturarUsuario');

router.use(capturarUsuario);

router.post('/', remitoController.crearRemito);
router.get('/', remitoController.listarRemitos);
router.get('/:id', remitoController.obtenerRemito);

module.exports = router;
