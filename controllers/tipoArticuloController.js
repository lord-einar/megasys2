const { TipoArticulo, sequelize } = require('../models');
const BaseService = require('../services/baseService');
const AuditoriaService = require('../services/auditoriaService');
const logger = require('../config/logger');

// Instancia del servicio para TipoArticulo
const tipoArticuloService = new BaseService(TipoArticulo);

// Crear un tipo de artículo
async function crearTipoArticulo(req, res) {
  const transaction = await sequelize.transaction();
  try {
    const tipoArticulo = await tipoArticuloService.create(req.body, transaction);

    // Registro en el histórico usando AuditoriaService
    await AuditoriaService.registrar(
      'TipoArticulo',
      'CREAR',
      tipoArticulo.id_tipo_articulo,
      req.user.displayName,
      transaction
    );

    await transaction.commit();
    logger.info(`Tipo de artículo creado con ID: ${tipoArticulo.id_tipo_articulo} por ${req.user.displayName}`);
    res.status(201).json(tipoArticulo);
  } catch (error) {
    await transaction.rollback();
    logger.error(`Error creando tipo de artículo: ${error.message}`);
    res.status(500).json({ message: 'Error al crear tipo de artículo' });
  }
}

// Listar todos los tipos de artículos
async function listarTipoArticulos(req, res) {
  try {
    const tiposArticulos = await tipoArticuloService.getAll();
    logger.info(`Listado de ${tiposArticulos.length} tipos de artículos obtenido por ${req.user.displayName}`);
    res.json(tiposArticulos);
  } catch (error) {
    logger.error(`Error listando tipos de artículos: ${error.message}`);
    res.status(500).json({ message: 'Error al listar tipos de artículos' });
  }
}

// Obtener un tipo de artículo por ID
async function obtenerTipoArticulo(req, res) {
  try {
    const tipoArticulo = await tipoArticuloService.getById(req.params.id);
    logger.info(`Tipo de artículo obtenido con ID: ${req.params.id} por ${req.user.displayName}`);
    res.json(tipoArticulo);
  } catch (error) {
    logger.error(`Error obteniendo tipo de artículo: ${error.message}`);
    res.status(500).json({ message: 'Error al obtener tipo de artículo' });
  }
}

// Actualizar un tipo de artículo
async function actualizarTipoArticulo(req, res) {
  const transaction = await sequelize.transaction();
  try {
    const tipoArticulo = await tipoArticuloService.update(req.params.id, req.body, transaction);

    // Registro en el histórico usando AuditoriaService
    await AuditoriaService.registrar(
      'TipoArticulo',
      'ACTUALIZAR',
      tipoArticulo.id_tipo_articulo,
      req.user.displayName,
      transaction
    );

    await transaction.commit();
    logger.info(`Tipo de artículo actualizado con ID: ${req.params.id} por ${req.user.displayName}`);
    res.json(tipoArticulo);
  } catch (error) {
    await transaction.rollback();
    logger.error(`Error actualizando tipo de artículo: ${error.message}`);
    res.status(500).json({ message: 'Error al actualizar tipo de artículo' });
  }
}

// Eliminar un tipo de artículo
async function eliminarTipoArticulo(req, res) {
  const transaction = await sequelize.transaction();
  try {
    await tipoArticuloService.delete(req.params.id, transaction);

    // Registro en el histórico usando AuditoriaService
    await AuditoriaService.registrar(
      'TipoArticulo',
      'ELIMINAR',
      req.params.id,
      req.user.displayName,
      transaction
    );

    await transaction.commit();
    logger.info(`Tipo de artículo eliminado con ID: ${req.params.id} por ${req.user.displayName}`);
    res.status(204).send();
  } catch (error) {
    await transaction.rollback();
    logger.error(`Error eliminando tipo de artículo: ${error.message}`);
    res.status(500).json({ message: 'Error al eliminar tipo de artículo' });
  }
}

module.exports = {
  crearTipoArticulo,
  listarTipoArticulos,
  obtenerTipoArticulo,
  actualizarTipoArticulo,
  eliminarTipoArticulo,
};
