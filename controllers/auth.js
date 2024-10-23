const passport = require('../config/passport');
const jwt = require('jsonwebtoken');
const logger = require('../config/logger');

class AuthController {
  generarToken(user) {
    const payload = {
      oid: user.oid,
      displayName: user.displayName,
      email: user._json.preferred_username,
      groups: user.groups,
    };
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '12h' });
  }

  // Solo inicia la autenticación, sin lógica adicional
  login(req, res, next) {
    passport.authenticate('azure_ad', { session: false })(req, res, next);
  }

  // Procesa el retorno desde Azure AD y responde con el token y datos del usuario
  openidReturn(req, res) {
    passport.authenticate('azure_ad', { session: false }, (err, user, info) => {
      if (err || !user) {
        logger.error('Error en la autenticación:', err || info);
        return res.status(401).json({ message: 'No autorizado' });
      }

      const token = this.generarToken(user);
      logger.info(`Usuario autenticado: ${user.displayName}`);

      const { displayName, _json: { preferred_username: email }, groups } = user;

      const infraGroupId = process.env.INFRA_GROUP_ID;
      const helpdeskGroupId = process.env.HELPDESK_GROUP_ID;

      const isInfraUser = groups.includes(infraGroupId);
      const isHelpdeskUser = groups.includes(helpdeskGroupId);

      res.json({
        token,
        usuario: {
          nombre: displayName,
          correo: email,
          roles: {
            infraestructura: isInfraUser,
            mesaDeAyuda: isHelpdeskUser,
          },
        },
        message: 'Inicio de sesión exitoso',
      });
    })(req, res);
  }

  logout(req, res) {
    req.logout((err) => {
      if (err) {
        logger.error('Error al cerrar sesión:', err);
        return res.status(500).json({ message: 'Error al cerrar sesión' });
      }
      res.redirect('/');
    });
  }

  dashboard(req, res) {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        return res.status(401).json({ message: 'Token no proporcionado' });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const { displayName, email, groups } = decoded;

      const infraGroupId = process.env.INFRA_GROUP_ID;
      const helpdeskGroupId = process.env.HELPDESK_GROUP_ID;

      const isInfraUser = groups.includes(infraGroupId);
      const isHelpdeskUser = groups.includes(helpdeskGroupId);

      res.render('dashboard', {
        displayName,
        email,
        infraUser: isInfraUser,
        helpdeskUser: isHelpdeskUser,
      });
    } catch (error) {
      logger.error(`Error en el dashboard: ${error.message}`);
      res.status(401).json({ message: 'Token inválido o expirado' });
    }
  }
}

module.exports = new AuthController();
