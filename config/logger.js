const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf, colorize } = format;

// Formato personalizado para los mensajes de log
const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}]: ${message}`;
});

const logger = createLogger({
  level: 'info', // Nivel mínimo para loguear
  format: combine(
    colorize(), // Color para la consola
    timestamp(), // Timestamp para cada log
    logFormat    // Aplicar formato personalizado
  ),
  transports: [
    new transports.Console(), // Enviar logs a la consola
    new transports.File({ filename: 'logs/error.log', level: 'error' }), // Logs de errores
    new transports.File({ filename: 'logs/combined.log' }) // Todos los logs
  ]
});

module.exports = logger;
