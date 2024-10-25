const { Inventario, Sede, Marca, TipoArticulo, sequelize } = require('../models');
const BaseService = require('../services/baseService');
const AuditoriaService = require('../services/auditoriaService');
const HistoricoInventarioService = require('../services/historicoInventarioService');
const logger = require('../config/logger');

const inventarioService = new BaseService(Inventario);

// Crear un nuevo artículo
async function crearArticulo(req, res) {
    const transaction = await sequelize.transaction();
    try {
      const nuevoArticulo = await inventarioService.create(req.body, transaction);
  
      await HistoricoInventarioService.registrarMovimiento(
        nuevoArticulo.id_inventario,
        '274f9dd7-777a-45ab-a9a2-667ab9c9b4e6',
        '274f9dd7-777a-45ab-a9a2-667ab9c9b4e6',// Sede "Depósito"
        999999, // Remito por defecto
        transaction
      );
  
      await AuditoriaService.registrar(
        'Inventario',
        'CREAR',
        nuevoArticulo.id_inventario,
        req.user.displayName,
        transaction
      );
  
      await transaction.commit();
      logger.info(`Artículo creado con ID: ${nuevoArticulo.id_inventario}`);
      res.status(201).json(nuevoArticulo);
    } catch (error) {
      await transaction.rollback();
      logger.error(`Error creando artículo: ${error.message}`);
      res.status(500).json({ message: 'Error al crear artículo' });
    }
  }
  

// Listar todos los artículos con marca y tipo de artículo
async function listarArticulos(req, res) {
  try {
    const articulos = await Inventario.findAll({
      where: { activo: true }, // Solo los activos
      include: [
        { model: Marca, attributes: ['nombre'] },
        { model: TipoArticulo, attributes: ['nombre'] },
      ],
    });
    res.json(articulos);
  } catch (error) {
    logger.error(`Error listando artículos: ${error.message}`);
    res.status(500).json({ message: 'Error al listar artículos' });
  }
}

// Obtener un artículo por ID con la sede donde se encuentra
async function obtenerArticulo(req, res) {
  try {
    const articulo = await Inventario.findByPk(req.params.id, {
      include: [
        { model: Sede, attributes: ['nombre'] },
        { model: Marca, attributes: ['nombre'] },
        { model: TipoArticulo, attributes: ['nombre'] },
      ],
    });

    if (!articulo) {
      return res.status(404).json({ message: 'Artículo no encontrado' });
    }

    res.json(articulo);
  } catch (error) {
    logger.error(`Error obteniendo artículo: ${error.message}`);
    res.status(500).json({ message: 'Error al obtener artículo' });
  }
}

// Actualizar un artículo existente
async function actualizarArticulo(req, res) {
    const transaction = await sequelize.transaction();
    try {
      const { id_remito, id_sede, ...data } = req.body;
  
      const articulo = await inventarioService.update(req.params.id, { ...data, id_sede }, transaction);
  
      await HistoricoInventarioService.registrarMovimiento(
        articulo.id_inventario,
        id_sede,
        id_remito,
        transaction
      );
  
      await AuditoriaService.registrar(
        'Inventario',
        'ACTUALIZAR',
        articulo.id_inventario,
        req.user.displayName,
        transaction
      );
  
      await transaction.commit();
      logger.info(`Artículo actualizado con ID: ${articulo.id_inventario}`);
      res.json(articulo);
    } catch (error) {
      await transaction.rollback();
      logger.error(`Error actualizando artículo: ${error.message}`);
      res.status(500).json({ message: 'Error al actualizar artículo' });
    }
  }

// Marcar un artículo como inactivo y moverlo a "Depósito"
async function eliminarArticulo(req, res) {
    const transaction = await sequelize.transaction();
    try {
      const { id_remito } = req.body;
  
      const articulo = await inventarioService.getById(req.params.id);
      if (!articulo) {
        return res.status(404).json({ message: 'Artículo no encontrado' });
      }
  
      await articulo.update(
        { activo: false, id_sede: '274f9dd7-777a-45ab-a9a2-667ab9c9b4e6' },
        { transaction }
      );
  
      await HistoricoInventarioService.registrarMovimiento(
        articulo.id_inventario,
        '274f9dd7-777a-45ab-a9a2-667ab9c9b4e6',
        id_remito,
        transaction
      );
  
      await AuditoriaService.registrar(
        'Inventario',
        'ELIMINAR',
        articulo.id_inventario,
        req.user.displayName,
        transaction
      );
  
      await transaction.commit();
      logger.info(`Artículo marcado como inactivo con ID: ${articulo.id_inventario}`);
      res.status(204).send();
    } catch (error) {
      await transaction.rollback();
      logger.error(`Error eliminando artículo: ${error.message}`);
      res.status(500).json({ message: 'Error al eliminar artículo' });
    }
  }

module.exports = {
  crearArticulo,
  listarArticulos,
  obtenerArticulo,
  actualizarArticulo,
  eliminarArticulo,
};
