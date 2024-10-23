const { Rol, sequelize } = require('../models');
const BaseService = require('../services/baseService');
const AuditoriaService = require('../services/auditoriaService');
const logger = require('../config/logger');

const rolService = new BaseService(Rol);

async function crearRol(req, res) {
  const transaction = await sequelize.transaction();
  try {
    const rol = await rolService.create(req.body, transaction);
    await AuditoriaService.registrar('Rol', 'CREAR', rol.id_rol, req.user.displayName, transaction);

    await transaction.commit();
    logger.info(`Rol creado con ID: ${rol.id_rol} por ${req.user.displayName}`);
    res.status(201).json(rol);
  } catch (error) {
    await transaction.rollback();
    logger.error(`Error creando rol: ${error.message}`);
    res.status(500).json({ message: 'Error al crear rol' });
  }
}

async function listarRoles(req, res) {
  try {
    const roles = await rolService.getAll();
    logger.info(`Listado de ${roles.length} roles obtenido por ${req.user.displayName}`);
    res.json(roles);
  } catch (error) {
    logger.error(`Error listando roles: ${error.message}`);
    res.status(500).json({ message: 'Error al listar roles' });
  }
}

async function obtenerRol(req, res) {
  try {
    const rol = await rolService.getById(req.params.id);
    logger.info(`Rol obtenido con ID: ${req.params.id} por ${req.user.displayName}`);
    res.json(rol);
  } catch (error) {
    logger.error(`Error obteniendo rol: ${error.message}`);
    res.status(500).json({ message: 'Error al obtener rol' });
  }
}

async function actualizarRol(req, res) {
  const transaction = await sequelize.transaction();
  try {
    const rol = await rolService.update(req.params.id, req.body, transaction);
    await AuditoriaService.registrar('Rol', 'ACTUALIZAR', rol.id_rol, req.user.displayName, transaction);

    await transaction.commit();
    logger.info(`Rol actualizado con ID: ${req.params.id} por ${req.user.displayName}`);
    res.json(rol);
  } catch (error) {
    await transaction.rollback();
    logger.error(`Error actualizando rol: ${error.message}`);
    res.status(500).json({ message: 'Error al actualizar rol' });
  }
}

async function eliminarRol(req, res) {
  const transaction = await sequelize.transaction();
  try {
    await rolService.delete(req.params.id, transaction);
    await AuditoriaService.registrar('Rol', 'ELIMINAR', req.params.id, req.user.displayName, transaction);

    await transaction.commit();
    logger.info(`Rol eliminado con ID: ${req.params.id} por ${req.user.displayName}`);
    res.status(204).send();
  } catch (error) {
    await transaction.rollback();
    logger.error(`Error eliminando rol: ${error.message}`);
    res.status(500).json({ message: 'Error al eliminar rol' });
  }
}

module.exports = {
  crearRol,
  listarRoles,
  obtenerRol,
  actualizarRol,
  eliminarRol,
};
