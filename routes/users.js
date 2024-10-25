const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const capturarUsuario = require('../middlewares/capturarUsuario');

router.use(capturarUsuario);

router.post('/', userController.crearUsuario);
router.get('/', userController.listarUsuarios);
router.get('/:id', userController.obtenerUsuario);
router.put('/:id', userController.actualizarUsuario);
router.delete('/:id', userController.eliminarUsuario);

module.exports = router;
