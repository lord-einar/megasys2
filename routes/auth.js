const express = require('express');
const passport = require('../config/passport');
const router = express.Router();

// Ruta para iniciar sesión
router.get('/login', (req, res, next) => {
    const state = Math.random().toString(36).substring(7); // Genera un estado aleatorio
    console.log('State generado:', state);
    req.session.oauthState = state; // Almacena el estado en la sesión
  
    passport.authenticate('azure_ad', {
      state: state
    })(req, res, next);
  });
  

// Ruta de retorno desde Azure AD
router.post('/openid/return', (req, res, next) => {
    console.log("Body", req.body)
    console.log("Query", req.query)
    console.log('State recibido desde Azure:', req.body.state || 'N/A'); // Log del state recibido
  
    passport.authenticate('azure_ad', (err, user, info) => {
      if (err) {
        console.error('Error en la autenticación:', err);
        return res.redirect('/?error=auth');
      }
      if (!user) {
        console.warn('Usuario no autenticado:', info);
        return res.redirect('/?error=no_user');
      }
  
      console.log('Usuario autenticado:', user);
      req.login(user, (loginErr) => {
        if (loginErr) {
          console.error('Error al iniciar la sesión:', loginErr);
          return res.redirect('/?error=session');
        }
        res.redirect('/auth/dashboard');
      });
    })(req, res, next);
  });
  

// Ruta para cerrar sesión
router.get('/logout', (req, res) => {
  console.log('Cerrando sesión...');
  req.logout(() => {
    res.redirect('/');
  });
});

router.get('/dashboard', (req, res) => {
    if (!req.isAuthenticated()) {
      console.warn('Intento de acceso sin autenticación.');
      return res.redirect('/login');
    }
  
    const displayName = req.user.displayName || req.user._json.name || 'Usuario';
    const email = req.user.emails && req.user.emails[0] || req.user._json.email || req.user._json.preferred_username || 'No disponible';
    const groups = req.user.groups || [];
  
    res.render('dashboard', { displayName, email, groups });
  });
  
  
  

module.exports = router;
