const { Empresa, sequelize } = require('../models');
const BaseService = require('../services/baseService');
const AuditoriaService = require('../services/auditoriaService');
const logger = require('../config/logger');

const empresaService = new BaseService(Empresa);

// Crear una empresa
async function crearEmpresa(req, res) {
  const transaction = await sequelize.transaction();
  try {
    const empresa = await empresaService.create(req.body, transaction);

    // Registro en el histórico usando AuditoriaService
    await AuditoriaService.registrar(
      'Empresa',
      'CREAR',
      empresa.id_empresa,
      req.user.displayName,
      transaction
    );

    await transaction.commit();
    logger.info(`Empresa creada con ID: ${empresa.id_empresa} por ${req.user.displayName}`);
    res.status(201).json(empresa);
  } catch (error) {
    await transaction.rollback();
    logger.error(`Error creando empresa: ${error.message}`);
    res.status(500).json({ message: 'Error al crear empresa' });
  }
}

// Listar todas las empresas
async function listarEmpresas(req, res) {
  try {
    const empresas = await empresaService.getAll();
    logger.info(`Listado de ${empresas.length} empresas obtenido por ${req.user.displayName}`);
    res.json(empresas);
  } catch (error) {
    logger.error(`Error listando empresas: ${error.message}`);
    res.status(500).json({ message: 'Error al listar empresas' });
  }
}

// Obtener una empresa por ID
async function obtenerEmpresa(req, res) {
  try {
    const empresa = await empresaService.getById(req.params.id);
    logger.info(`Empresa obtenida con ID: ${req.params.id} por ${req.user.displayName}`);
    res.json(empresa);
  } catch (error) {
    logger.error(`Error obteniendo empresa: ${error.message}`);
    res.status(500).json({ message: 'Error al obtener empresa' });
  }
}

// Actualizar una empresa
async function actualizarEmpresa(req, res) {
  const transaction = await sequelize.transaction();
  try {
    const empresa = await empresaService.update(req.params.id, req.body, transaction);

    // Registro en el histórico usando AuditoriaService
    await AuditoriaService.registrar(
      'Empresa',
      'ACTUALIZAR',
      empresa.id_empresa,
      req.user.displayName,
      transaction
    );

    await transaction.commit();
    logger.info(`Empresa actualizada con ID: ${req.params.id} por ${req.user.displayName}`);
    res.json(empresa);
  } catch (error) {
    await transaction.rollback();
    logger.error(`Error actualizando empresa: ${error.message}`);
    res.status(500).json({ message: 'Error al actualizar empresa' });
  }
}

// Eliminar una empresa
async function eliminarEmpresa(req, res) {
  const transaction = await sequelize.transaction();
  try {
    await empresaService.delete(req.params.id, transaction);

    // Registro en el histórico usando AuditoriaService
    await AuditoriaService.registrar(
      'Empresa',
      'ELIMINAR',
      req.params.id,
      req.user.displayName,
      transaction
    );

    await transaction.commit();
    logger.info(`Empresa eliminada con ID: ${req.params.id} por ${req.user.displayName}`);
    res.status(204).send();
  } catch (error) {
    await transaction.rollback();
    logger.error(`Error eliminando empresa: ${error.message}`);
    res.status(500).json({ message: 'Error al eliminar empresa' });
  }
}

module.exports = {
  crearEmpresa,
  listarEmpresas,
  obtenerEmpresa,
  actualizarEmpresa,
  eliminarEmpresa,
};
