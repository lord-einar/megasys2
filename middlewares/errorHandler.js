// middlewares/errorHandler.js
const logger = require('../config/logger'); // Importar Winston

const errorHandler = (err, req, res, next) => {
  logger.error(err.stack); // Registrar el error usando Winston

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    success: false,
    error: message,
  });
};

module.exports = errorHandler;
