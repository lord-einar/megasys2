// controllers/sedeController.js
const { Sede, sequelize } = require('../models');
const BaseService = require('../services/baseService');
const AuditoriaService = require('../services/auditoriaService');
const logger = require('../config/logger');

const sedeService = new BaseService(Sede);

// Función para crear una sede
async function crearSede(req, res) {
  const transaction = await sequelize.transaction();
  try {
    const sede = await sedeService.create(req.body, transaction);

    await AuditoriaService.registrar(
      'Sede',
      'CREAR',
      sede.id_sede,
      req.user.displayName,
      transaction
    );

    await transaction.commit();
    logger.info(`Sede creada con ID: ${sede.id_sede} por ${req.user.displayName}`);
    res.status(201).json(sede);
  } catch (error) {
    await transaction.rollback();
    logger.error(`Error creando sede: ${error.message}`);
    res.status(500).json({ message: 'Error al crear sede' });
  }
}

// Función para listar sedes
async function listarSedes(req, res) {
  try {
    const sedes = await sedeService.getAll();
    logger.info(`Listado de ${sedes.length} sedes obtenido por ${req.user.displayName}`);
    res.json(sedes);
  } catch (error) {
    logger.error(`Error listando sedes: ${error.message}`);
    res.status(500).json({ message: 'Error al listar sedes' });
  }
}

// Función para obtener una sede por ID
async function obtenerSede(req, res) {
  try {
    const sede = await sedeService.getById(req.params.id);
    logger.info(`Sede obtenida con ID: ${req.params.id} por ${req.user.displayName}`);
    res.json(sede);
  } catch (error) {
    logger.error(`Error obteniendo sede: ${error.message}`);
    res.status(500).json({ message: 'Error al obtener sede' });
  }
}

// Función para actualizar una sede
async function actualizarSede(req, res) {
  const transaction = await sequelize.transaction();
  try {
    const sede = await sedeService.update(req.params.id, req.body, transaction);

    await AuditoriaService.registrar(
      'Sede',
      'ACTUALIZAR',
      sede.id_sede,
      req.user.displayName,
      transaction
    );

    await transaction.commit();
    logger.info(`Sede actualizada con ID: ${req.params.id} por ${req.user.displayName}`);
    res.json(sede);
  } catch (error) {
    await transaction.rollback();
    logger.error(`Error actualizando sede: ${error.message}`);
    res.status(500).json({ message: 'Error al actualizar sede' });
  }
}

// Función para eliminar una sede
async function eliminarSede(req, res) {
  const transaction = await sequelize.transaction();
  try {
    await sedeService.delete(req.params.id, transaction);

    await AuditoriaService.registrar(
      'Sede',
      'ELIMINAR',
      req.params.id,
      req.user.displayName,
      transaction
    );

    await transaction.commit();
    logger.info(`Sede eliminada con ID: ${req.params.id} por ${req.user.displayName}`);
    res.status(204).send();
  } catch (error) {
    await transaction.rollback();
    logger.error(`Error eliminando sede: ${error.message}`);
    res.status(500).json({ message: 'Error al eliminar sede' });
  }
}

// Exportar todas las funciones en un objeto
module.exports = {
  crearSede,
  listarSedes,
  obtenerSede,
  actualizarSede,
  eliminarSede,
};
