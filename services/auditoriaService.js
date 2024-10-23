// services/auditoriaService.js
const { Historico } = require('../models');
const logger = require('../config/logger');

class AuditoriaService {
  static async registrar(entidad, accion, idEntidad, usuario, transaction) {
    try {
      await Historico.create({
        entidad,
        accion,
        id_entidad: idEntidad,
        usuario,
        fecha: new Date(),
      }, { transaction });

      logger.info(`Acción registrada: ${accion} en ${entidad} por ${usuario}`);
    } catch (error) {
      logger.error(`Error registrando acción en histórico: ${error.message}`);
      throw error;
    }
  }
}

module.exports = AuditoriaService;
