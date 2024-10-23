const jwt = require('jsonwebtoken');
const logger = require('../config/logger');

// Middleware para capturar al usuario desde el token JWT
function capturarUsuario(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    logger.warn('Intento de acceso sin token.');
    return res.status(401).json({ message: 'No autorizado. Token faltante.' });
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      logger.warn(`Token inválido: ${err.message}`);
      return res.status(403).json({ message: 'Token inválido o expirado.' });
    }

    req.user = user;
    logger.info(`Usuario autenticado: ${user.displayName} (${user.oid})`);
    next();
  });
}

module.exports = capturarUsuario;
