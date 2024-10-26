const RemitoService = require('../services/RemitoService');
const AuditoriaService = require('../services/auditoriaService');
const logger = require('../config/logger');

// Crear un nuevo remito con auditoría
async function crearRemito(req, res) {
  try {
    const nuevoRemito = await RemitoService.crearRemitoConArticulos(req.body);
    const idRemito = nuevoRemito.remito.dataValues.id_remito;


    // Registrar auditoría
    await AuditoriaService.registrar(
      'Remito',
      'CREAR',
      idRemito,
      req.user.displayName
    );

    res.status(201).json(nuevoRemito);
  } catch (error) {
    logger.error(`Error creando remito: ${error.message}`);
    res.status(500).json({ message: 'Error al crear remito' });
  }
}

async function obtenerRemito(req, res) {
  try {
    const remito = await RemitoService.obtenerRemitoPorId(req.params.id);
    if (!remito) {
      return res.status(404).json({ message: 'Remito no encontrado' });
    }
    res.json(remito);
  } catch (error) {
    logger.error(`Error obteniendo remito: ${error.message}`);
    res.status(500).json({ message: 'Error al obtener remito' });
  }
}

async function listarRemitos(req, res) {
  try {
    const remitos = await RemitoService.listarRemitos();
    res.json(remitos);
  } catch (error) {
    logger.error(`Error listando remitos: ${error.message}`);
    res.status(500).json({ message: 'Error al listar remitos' });
  }
}

module.exports = {
  crearRemito,
  obtenerRemito,
  listarRemitos,
};
