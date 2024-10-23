const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth'); // Instancia de la clase

// Ruta para iniciar sesión
router.get('/login', (req, res, next) => authController.login(req, res, next));

// Ruta de retorno desde Azure AD
router.post('/openid/return', (req, res, next) => authController.openidReturn(req, res, next));

// Ruta para cerrar sesión
router.get('/logout', (req, res) => authController.logout(req, res));

// Ruta del dashboard
router.get('/dashboard', (req, res) => authController.dashboard(req, res));

module.exports = router;
