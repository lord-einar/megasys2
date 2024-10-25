const { Remito, RemitoInventario, Inventario, sequelize } = require('../models');
const logger = require('../config/logger');
const HistoricoInventarioService = require('./historicoInventarioService');
const Sede = require('../models/Sede');
const User = require('../models/User');
const Persona = require('../models/Persona');

class RemitoService {
  // Crear un remito y registrar movimientos en el histórico
  static async crearRemitoConArticulos(data) {
    const { id_sede, id_persona, id_user, fecha_remito, articulos } = data;
    const transaction = await sequelize.transaction();

    try {
      // Crear el remito
      const nuevoRemito = await Remito.create(
        { id_sede, id_persona, id_user, fecha_remito },
        { transaction }
      );

      // Procesar cada artículo en el remito
      for (const articulo of articulos) {
        // Obtener el inventario actual para conocer la sede origen
        const inventario = await Inventario.findByPk(articulo.id_inventario, { transaction });

        if (!inventario) {
          throw new Error(`Inventario con ID ${articulo.id_inventario} no encontrado.`);
        }

        // Registrar en remito_inventario
        await RemitoInventario.create(
          {
            id_remito: nuevoRemito.id_remito,
            id_inventario: inventario.id_inventario,
            es_prestamo: articulo.es_prestamo || false,
            fecha_devolucion: articulo.fecha_devolucion || null,
            observaciones: articulo.observaciones || '',
          },
          { transaction }
        );

        // Registrar el movimiento en historico_inventario
        await HistoricoInventarioService.registrarMovimiento(
          inventario.id_inventario,
          inventario.id_sede, // Sede actual como origen
          id_sede, // Nueva sede como destino
          nuevoRemito.id_remito,
          transaction
        );

        // Actualizar la sede del inventario al destino del remito
        await inventario.update({ id_sede }, { transaction });
      }

      await transaction.commit();
      logger.info(`Remito creado con ID: ${nuevoRemito.id_remito}`);
      return nuevoRemito;
    } catch (error) {
      await transaction.rollback();
      logger.error(`Error creando remito: ${error.message}`);
      throw error;
    }
  }

  static async obtenerRemitoPorId(id_remito) {
    try {
      return await Remito.findByPk(id_remito, {
        include: [
          { model: Sede, attributes: ['nombre'] },
          { model: User, attributes: ['nombre'] },
          { model: Persona, attributes: ['nombre', 'apellido'] },
          {
            model: RemitoInventario,
            attributes: ['id_inventario', 'es_prestamo', 'fecha_devolucion', 'observaciones', 'devuelto'],
            include: [
              {
                model: Inventario,
                attributes: ['id_inventario', 'modelo', 'service_tag', 'num_serie'],
              },
            ],
          },
        ],
      });
    } catch (error) {
      logger.error(`Error obteniendo remito: ${error.message}`);
      throw error;
    }
  }

  static async listarRemitos() {
    try {
      return await Remito.findAll({
        include: [{ model: Sede, attributes: ['nombre'] }],
      });
    } catch (error) {
      logger.error(`Error listando remitos: ${error.message}`);
      throw error;
    }
  }
}

module.exports = RemitoService;
