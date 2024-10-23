// models/associations.js
const User = require('../models/User');
const Inventario = require('../models/Inventario');
const Sede = require('../models/Sede');
const Remito = require('../models/Remito');
const Marca = require('../models/Marca');
const TipoArticulo = require('../models/Tipo_articulo');
const HistoricoInventario = require('../models/HistoricoInventario');
const Proveedor = require('../models/Proveedor');
const Servicio = require('../models/Servicio');
const Persona = require('../models/Persona');
const Rol = require('../models/Rol');
const SedePersona = require('../models/Sede_Persona')

const applyAssociations = () => {
  // Un Inventario pertenece a una Sede y una Marca
  Inventario.belongsTo(Sede, { foreignKey: 'id_sede' });
  Inventario.belongsTo(Marca, { foreignKey: 'id_marca' });
  Inventario.belongsTo(TipoArticulo, { foreignKey: 'id_tipo_articulo' });

  // Un Remito tiene múltiples Inventarios (relación N:N a través de Remito_Inventario)
  Remito.belongsToMany(Inventario, { through: 'Remito_Inventario', foreignKey: 'id_remito' });
  Inventario.belongsToMany(Remito, { through: 'Remito_Inventario', foreignKey: 'id_inventario' });

  // Un Sede puede tener muchas personas asignadas (relación N:N)
  Sede.belongsToMany(User, { through: 'Sede_Persona', foreignKey: 'id_sede' });
  User.belongsToMany(Sede, { through: 'Sede_Persona', foreignKey: 'id_user' });

  // Un Proveedor puede tener muchos servicios (N:N)
  Proveedor.belongsToMany(Servicio, { through: 'Servicio_Proveedor', foreignKey: 'id_proveedor' });
  Servicio.belongsToMany(Proveedor, { through: 'Servicio_Proveedor', foreignKey: 'id_servicio' });

  // Un Historial de Inventario pertenece a un Inventario, una Sede y un Remito
  HistoricoInventario.belongsTo(Inventario, { foreignKey: 'id_inventario' });
  HistoricoInventario.belongsTo(Sede, { foreignKey: 'id_sede' });
  HistoricoInventario.belongsTo(Remito, { foreignKey: 'id_remito' });

  // Asociación N:M entre Sede y Persona a través de SedePersona
  Sede.belongsToMany(Persona, { through: SedePersona, foreignKey: 'id_sede' });
  Persona.belongsToMany(Sede, { through: SedePersona, foreignKey: 'id_persona' });

  // Asociación entre SedePersona y Rol
  SedePersona.belongsTo(Rol, { foreignKey: 'id_rol' });
  Rol.hasMany(SedePersona, { foreignKey: 'id_rol' });

  // Asociación entre Persona y SedePersona
  Persona.hasMany(SedePersona, { foreignKey: 'id_persona' });
  SedePersona.belongsTo(Persona, { foreignKey: 'id_persona' });

  // Asociación entre Sede y SedePersona
  Sede.hasMany(SedePersona, { foreignKey: 'id_sede' });
  SedePersona.belongsTo(Sede, { foreignKey: 'id_sede' });
};

module.exports = { applyAssociations };
