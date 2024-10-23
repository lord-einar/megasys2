const { HistoricoInventario } = require('../models');
const logger = require('../config/logger');

class HistoricoInventarioService {
  static async registrarMovimiento(id_inventario, id_sede_origen, id_sede_destino, id_remito, transaction = null) {
    try {
      await HistoricoInventario.create(
        { id_inventario, id_sede_origen, id_sede_destino, id_remito },
        { transaction }
      );
      logger.info(`Movimiento registrado para inventario: ${id_inventario}`);
    } catch (error) {
      logger.error(`Error registrando movimiento: ${error.message}`);
      throw error;
    }
  }
}

module.exports = HistoricoInventarioService;
