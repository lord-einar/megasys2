const { Persona, sequelize } = require('../models');
const BaseService = require('../services/baseService');
const AuditoriaService = require('../services/auditoriaService');
const logger = require('../config/logger');
const Sede = require('../models/Sede');
const Rol = require('../models/Rol');
const SedePersona = require('../models/Sede_Persona');

// Instancia del servicio para Persona
const personaService = new BaseService(Persona);

// Crear una persona
async function crearPersona(req, res) {
  const transaction = await sequelize.transaction();
  try {
    const persona = await personaService.create(req.body, transaction);

    // Registro en el histórico usando AuditoriaService
    await AuditoriaService.registrar(
      'Persona',
      'CREAR',
      persona.id_persona,
      req.user.displayName,
      transaction
    );

    await transaction.commit();
    logger.info(`Persona creada con ID: ${persona.id_persona} por ${req.user.displayName}`);
    res.status(201).json(persona);
  } catch (error) {
    await transaction.rollback();
    logger.error(`Error creando persona: ${error.message}`);
    res.status(500).json({ message: 'Error al crear persona' });
  }
}

// Listar todas las personas
async function listarPersonas(req, res) {
  try {
    const personas = await personaService.getAll();
    logger.info(`Listado de ${personas.length} personas obtenido por ${req.user.displayName}`);
    res.json(personas);
  } catch (error) {
    logger.error(`Error listando personas: ${error.message}`);
    res.status(500).json({ message: 'Error al listar personas' });
  }
}

// Obtener una persona por ID
async function obtenerPersona(req, res) {
    try {
      const persona = await personaService.getById(req.params.id, {
        include: [
          {
            model: Sede,
            through: { attributes: [] }, // Excluir atributos de la tabla intermedia
            attributes: ['id_sede', 'nombre'], // Solo traer ID y nombre de la sede
            include: [
              {
                model: SedePersona,
                attributes: ['id_rol'], // Solo traer el ID del rol
                include: [{ model: Rol, attributes: ['nombre'] }], // Traer nombre del rol
              },
            ],
          },
        ],
      });
  
      if (!persona) {
        return res.status(404).json({ message: 'Persona no encontrada' });
      }
  
      // Formatear la respuesta para incluir solo los datos solicitados
      const sedesConRoles = persona.Sedes.map((sede) => ({
        id_sede: sede.id_sede,
        nombre_sede: sede.nombre,
        rol: sede.SedePersonas[0]?.Rol?.nombre || 'Sin rol asignado',
      }));
  
      const respuesta = {
        id_persona: persona.id_persona,
        nombre: persona.nombre,
        apellido: persona.apellido,
        email: persona.email,
        telefono: persona.telefono,
        sedes: sedesConRoles,
      };
  
      logger.info(`Persona obtenida con ID: ${req.params.id} por ${req.user.displayName}`);
      res.json(respuesta);
    } catch (error) {
      logger.error(`Error obteniendo persona: ${error.message}`);
      res.status(500).json({ message: 'Error al obtener persona' });
    }
  }

// Actualizar una persona
async function actualizarPersona(req, res) {
  const transaction = await sequelize.transaction();
  try {
    const persona = await personaService.update(req.params.id, req.body, transaction);

    // Registro en el histórico usando AuditoriaService
    await AuditoriaService.registrar(
      'Persona',
      'ACTUALIZAR',
      persona.id_persona,
      req.user.displayName,
      transaction
    );

    await transaction.commit();
    logger.info(`Persona actualizada con ID: ${req.params.id} por ${req.user.displayName}`);
    res.json(persona);
  } catch (error) {
    await transaction.rollback();
    logger.error(`Error actualizando persona: ${error.message}`);
    res.status(500).json({ message: 'Error al actualizar persona' });
  }
}

// Eliminar una persona
async function eliminarPersona(req, res) {
  const transaction = await sequelize.transaction();
  try {
    await personaService.delete(req.params.id, transaction);

    // Registro en el histórico usando AuditoriaService
    await AuditoriaService.registrar(
      'Persona',
      'ELIMINAR',
      req.params.id,
      req.user.displayName,
      transaction
    );

    await transaction.commit();
    logger.info(`Persona eliminada con ID: ${req.params.id} por ${req.user.displayName}`);
    res.status(204).send();
  } catch (error) {
    await transaction.rollback();
    logger.error(`Error eliminando persona: ${error.message}`);
    res.status(500).json({ message: 'Error al eliminar persona' });
  }
}

module.exports = {
  crearPersona,
  listarPersonas,
  obtenerPersona,
  actualizarPersona,
  eliminarPersona,
};
