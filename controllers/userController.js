const { User, sequelize } = require('../models');
const BaseService = require('../services/baseService');
const AuditoriaService = require('../services/auditoriaService');
const logger = require('../config/logger');

const userService = new BaseService(User);

// Crear un usuario
async function crearUsuario(req, res) {
  const transaction = await sequelize.transaction();
  try {
    const nuevoUsuario = await userService.create(req.body, transaction);

    // Registrar en auditoría
    await AuditoriaService.registrar(
      'User',
      'CREAR',
      nuevoUsuario.id_user,
      req.user.displayName,
      transaction
    );

    await transaction.commit();
    logger.info(`Usuario creado con ID: ${nuevoUsuario.id_user}`);
    res.status(201).json(nuevoUsuario);
  } catch (error) {
    await transaction.rollback();
    logger.error(`Error creando usuario: ${error.message}`);
    res.status(500).json({ message: 'Error al crear usuario' });
  }
}

// Listar todos los usuarios
async function listarUsuarios(req, res) {
  try {
    const usuarios = await userService.getAll();
    logger.info(`Listado de usuarios obtenido por ${req.user.displayName}`);
    res.json(usuarios);
  } catch (error) {
    logger.error(`Error listando usuarios: ${error.message}`);
    res.status(500).json({ message: 'Error al listar usuarios' });
  }
}

// Obtener un usuario por ID
async function obtenerUsuario(req, res) {
  try {
    const usuario = await userService.getById(req.params.id);
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    logger.info(`Usuario obtenido con ID: ${req.params.id} por ${req.user.displayName}`);
    res.json(usuario);
  } catch (error) {
    logger.error(`Error obteniendo usuario: ${error.message}`);
    res.status(500).json({ message: 'Error al obtener usuario' });
  }
}

// Actualizar un usuario
async function actualizarUsuario(req, res) {
  const transaction = await sequelize.transaction();
  try {
    const usuario = await userService.update(req.params.id, req.body, transaction);

    // Registrar en auditoría
    await AuditoriaService.registrar(
      'User',
      'ACTUALIZAR',
      usuario.id_user,
      req.user.displayName,
      transaction
    );

    await transaction.commit();
    logger.info(`Usuario actualizado con ID: ${usuario.id_user}`);
    res.json(usuario);
  } catch (error) {
    await transaction.rollback();
    logger.error(`Error actualizando usuario: ${error.message}`);
    res.status(500).json({ message: 'Error al actualizar usuario' });
  }
}

// Eliminar un usuario (lógico, marcando activo como false)
async function eliminarUsuario(req, res) {
  const transaction = await sequelize.transaction();
  try {
    const usuario = await userService.getById(req.params.id);
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    await usuario.update({ active: false }, { transaction });

    // Registrar en auditoría
    await AuditoriaService.registrar(
      'User',
      'ELIMINAR',
      usuario.id_user,
      req.user.displayName,
      transaction
    );

    await transaction.commit();
    logger.info(`Usuario marcado como inactivo con ID: ${usuario.id_user}`);
    res.status(204).send();
  } catch (error) {
    await transaction.rollback();
    logger.error(`Error eliminando usuario: ${error.message}`);
    res.status(500).json({ message: 'Error al eliminar usuario' });
  }
}

module.exports = {
  crearUsuario,
  listarUsuarios,
  obtenerUsuario,
  actualizarUsuario,
  eliminarUsuario,
};
