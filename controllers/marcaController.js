const { Marca, sequelize } = require('../models');
const BaseService = require('../services/baseService');
const AuditoriaService = require('../services/auditoriaService');
const logger = require('../config/logger');

const marcaService = new BaseService(Marca);

async function crearMarca(req, res) {
    const transaction = await sequelize.transaction();
    try {
      const marca = await marcaService.create(req.body, transaction);
      await AuditoriaService.registrar('Marca', 'CREAR', marca.id_marca, req.user.displayName, transaction);
  
      await transaction.commit();
      logger.info(`Marca creado con ID: ${marca.id_marca} por ${req.user.displayName}`);
      res.status(201).json(marca);
    } catch (error) {
      await transaction.rollback();
      logger.error(`Error creando marca: ${error.message}`);
      res.status(500).json({ message: 'Error al crear marca' });
    }
  }
  
  async function listarMarcas(req, res) {
    try {
      const marcas = await marcaService.getAll();
      logger.info(`Listado de ${marcas.length} marcas obtenido por ${req.user.displayName}`);
      res.json(marcas);
    } catch (error) {
      logger.error(`Error listando marcas: ${error.message}`);
      res.status(500).json({ message: 'Error al listar marcas' });
    }
  }
  
  async function obtenerMarca(req, res) {
    try {
      const marca = await marcaService.getById(req.params.id);
      logger.info(`Marca obtenido con ID: ${req.params.id} por ${req.user.displayName}`);
      res.json(marca);
    } catch (error) {
      logger.error(`Error obteniendo marca: ${error.message}`);
      res.status(500).json({ message: 'Error al obtener marca' });
    }
  }
  
  async function actualizarMarca(req, res) {
    const transaction = await sequelize.transaction();
    try {
      const marca = await marcaService.update(req.params.id, req.body, transaction);
      await AuditoriaService.registrar('Marca', 'ACTUALIZAR', marca.id_marca, req.user.displayName, transaction);
  
      await transaction.commit();
      logger.info(`Marca actualizado con ID: ${req.params.id} por ${req.user.displayName}`);
      res.json(marca);
    } catch (error) {
      await transaction.rollback();
      logger.error(`Error actualizando marca: ${error.message}`);
      res.status(500).json({ message: 'Error al actualizar marca' });
    }
  }
  
  async function eliminarMarca(req, res) {
    const transaction = await sequelize.transaction();
    try {
      await marcaService.delete(req.params.id, transaction);
      await AuditoriaService.registrar('Marca', 'ELIMINAR', req.params.id, req.user.displayName, transaction);
  
      await transaction.commit();
      logger.info(`Marca eliminado con ID: ${req.params.id} por ${req.user.displayName}`);
      res.status(204).send();
    } catch (error) {
      await transaction.rollback();
      logger.error(`Error eliminando marca: ${error.message}`);
      res.status(500).json({ message: 'Error al eliminar marca' });
    }
  }

module.exports = {
  crearMarca,
  listarMarcas,
  obtenerMarca,
  actualizarMarca,
  eliminarMarca,
};
