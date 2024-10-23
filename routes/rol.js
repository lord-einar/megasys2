const express = require('express');
const router = express.Router();
const rolController = require('../controllers/rolController');
const capturarUsuario = require('../middlewares/capturarUsuario');


router.use(capturarUsuario);

router.post('/', rolController.crearRol);
router.get('/', rolController.listarRoles);
router.get('/:id', rolController.obtenerRol);
router.put('/:id', rolController.actualizarRol);
router.delete('/:id', rolController.eliminarRol);

module.exports = router;
