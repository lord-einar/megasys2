const logger = require('../config/logger');
const passport = require('../config/passport');

// Cargar las variables de entorno
require('dotenv').config();

// Controlador para iniciar sesión
exports.login = (req, res, next) => {
    const state = Math.random().toString(36).substring(7); // Genera un estado aleatorio
    logger.info('State generado:', state);
    req.session.oauthState = state; // Almacena el estado en la sesión
  
    passport.authenticate('azure_ad', {
      state: state
    })(req, res, next);
};

// Controlador para la ruta de retorno desde Azure AD
exports.openidReturn = (req, res, next) => {
    logger.info("Body", req.body);
    logger.info("Query", req.query);
    logger.info('State recibido desde Azure:', req.body.state || 'N/A'); // Log del state recibido
  
    passport.authenticate('azure_ad', (err, user, info) => {
      if (err) {
        logger.error('Error en la autenticación:', err);
        return res.redirect('/?error=auth');
      }
      if (!user) {
        logger.warn('Usuario no autenticado:', info);
        return res.redirect('/?error=no_user');
      }
  
      logger.info('Usuario autenticado:', user);
      req.login(user, (loginErr) => {
        if (loginErr) {
          logger.error('Error al iniciar la sesión:', loginErr);
          return res.redirect('/?error=session');
        }
        res.redirect('/auth/dashboard');
      });
    })(req, res, next);
};

// Controlador para cerrar sesión
exports.logout = (req, res) => {
    logger.info('Cerrando sesión...');
    req.logout(() => {
      res.redirect('/');
    });
};

// Controlador para el dashboard
exports.dashboard = (req, res) => {
    if (!req.isAuthenticated()) {
      logger.warn('Intento de acceso sin autenticación.');
      return res.redirect('/login');
    }
  
    const displayName = req.user.displayName || req.user._json.name || 'Usuario';
    const email = req.user.emails && req.user.emails[0] || req.user._json.email || req.user._json.preferred_username || 'No disponible';
    const groups = req.user.groups || [];
  
    const infraGroupId = process.env.INFRA_GROUP_ID;
    const helpdeskGroupId = process.env.HELPDESK_GROUP_ID;
    const isInfraUser = groups.includes(infraGroupId);
    const isHelpdeskUser = groups.includes(helpdeskGroupId);
  
    res.render('dashboard', { displayName, email, groups, infraUser: isInfraUser, helpdeskUser: isHelpdeskUser });
};
