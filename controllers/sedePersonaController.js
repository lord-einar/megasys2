const { SedePersona, sequelize } = require('../models');
const BaseService = require('../services/baseService');
const AuditoriaService = require('../services/auditoriaService');
const logger = require('../config/logger');

const sedePersonaService = new BaseService(SedePersona);

// Crear una asignación de persona a sede
async function asignarPersona(req, res) {
  const transaction = await sequelize.transaction();
  try {
    const sedePersona = await sedePersonaService.create(req.body, transaction);

    // Registro en el histórico usando AuditoriaService
    await AuditoriaService.registrar(
      'SedePersona',
      'CREAR',
      sedePersona.id_sedePersona,
      req.user.displayName,
      transaction
    );

    await transaction.commit();
    logger.info(`Asignación creada con ID: ${sedePersona.id_sedePersona} por ${req.user.displayName}`);
    res.status(201).json(sedePersona);
  } catch (error) {
    await transaction.rollback();
    logger.error(`Error creando asignación: ${error.message}`);
    res.status(500).json({ message: 'Error al crear asignación' });
  }
}

// Listar todas las asignaciones
async function listarAsignaciones(req, res) {
  try {
    const asignaciones = await sedePersonaService.getAll();
    logger.info(`Listado de ${asignaciones.length} asignaciones obtenido por ${req.user.displayName}`);
    res.json(asignaciones);
  } catch (error) {
    logger.error(`Error listando asignaciones: ${error.message}`);
    res.status(500).json({ message: 'Error al listar asignaciones' });
  }
}

// Obtener una asignación específica
async function obtenerAsignacion(req, res) {
  try {
    const asignacion = await sedePersonaService.getById(req.params.id);
    logger.info(`Asignación obtenida con ID: ${req.params.id} por ${req.user.displayName}`);
    res.json(asignacion);
  } catch (error) {
    logger.error(`Error obteniendo asignación: ${error.message}`);
    res.status(500).json({ message: 'Error al obtener asignación' });
  }
}

// Actualizar una asignación
async function actualizarAsignacion(req, res) {
  const transaction = await sequelize.transaction();
  try {
    const asignacion = await sedePersonaService.update(req.params.id, req.body, transaction);

    await AuditoriaService.registrar(
      'SedePersona',
      'ACTUALIZAR',
      asignacion.id_sedePersona,
      req.user.displayName,
      transaction
    );

    await transaction.commit();
    logger.info(`Asignación actualizada con ID: ${req.params.id} por ${req.user.displayName}`);
    res.json(asignacion);
  } catch (error) {
    await transaction.rollback();
    logger.error(`Error actualizando asignación: ${error.message}`);
    res.status(500).json({ message: 'Error al actualizar asignación' });
  }
}

// Eliminar una asignación
async function eliminarAsignacion(req, res) {
  const transaction = await sequelize.transaction();
  try {
    await sedePersonaService.delete(req.params.id, transaction);

    await AuditoriaService.registrar(
      'SedePersona',
      'ELIMINAR',
      req.params.id,
      req.user.displayName,
      transaction
    );

    await transaction.commit();
    logger.info(`Asignación eliminada con ID: ${req.params.id} por ${req.user.displayName}`);
    res.status(204).send();
  } catch (error) {
    await transaction.rollback();
    logger.error(`Error eliminando asignación: ${error.message}`);
    res.status(500).json({ message: 'Error al eliminar asignación' });
  }
}

module.exports = {
  asignarPersona,
  listarAsignaciones,
  obtenerAsignacion,
  actualizarAsignacion,
  eliminarAsignacion,
};
