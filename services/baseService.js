// services/baseService.js
const logger = require('../config/logger');

class BaseService {
  constructor(model) {
    this.model = model;
  }

  // Obtener todos los registros con soporte de condiciones, ordenación y asociaciones
  async getAll(orderField = 'nombre', whereCondition = {}, options = {}) {
    try {
      const records = await this.model.findAll({
        where: whereCondition,
        order: [[orderField, 'ASC']],
        ...options, // Incluir opciones adicionales (como include)
      });
      logger.info(`Obtenidos ${records.length} registros de ${this.model.name}`);
      return records;
    } catch (error) {
      logger.error(`Error obteniendo registros: ${error.message}`);
      throw error;
    }
  }

  // Obtener un registro por ID con soporte de asociaciones
  async getById(id, options = {}) {
    try {
      const record = await this.model.findByPk(id, options);
      if (!record) {
        logger.warn(`Registro no encontrado en ${this.model.name} con ID: ${id}`);
        throw new Error('Registro no encontrado');
      }
      logger.info(`Registro encontrado en ${this.model.name} con ID: ${id}`);
      return record;
    } catch (error) {
      logger.error(`Error obteniendo registro por ID: ${error.message}`);
      throw error;
    }
  }

  // Crear un nuevo registro con soporte opcional de transacción
  async create(data, transaction = null) {
    try {
      const record = await this.model.create(data, { transaction });
      logger.info(`Registro creado en ${this.model.name} con ID: ${record.id}`);
      return record;
    } catch (error) {
      logger.error(`Error creando registro: ${error.message}`);
      throw error;
    }
  }

  // Actualizar un registro existente
  async update(id, data, transaction = null) {
    try {
      const record = await this.getById(id);
      const updatedRecord = await record.update(data, { transaction });
      logger.info(`Registro actualizado en ${this.model.name} con ID: ${id}`);
      return updatedRecord;
    } catch (error) {
      logger.error(`Error actualizando registro: ${error.message}`);
      throw error;
    }
  }

  // Eliminar un registro existente
  async delete(id, transaction = null) {
    try {
      const record = await this.getById(id);
      await record.destroy({ transaction });
      logger.info(`Registro eliminado de ${this.model.name} con ID: ${id}`);
    } catch (error) {
      logger.error(`Error eliminando registro: ${error.message}`);
      throw error;
    }
  }
}

module.exports = BaseService;
