const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');

// Ruta para iniciar sesión
router.get('/login', authController.login);

// Ruta de retorno desde Azure AD
router.post('/openid/return', authController.openidReturn);

// Ruta para cerrar sesión
router.get('/logout', authController.logout);

// Ruta del dashboard
router.get('/dashboard', authController.dashboard);

module.exports = router;