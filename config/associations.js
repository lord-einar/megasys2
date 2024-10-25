const User = require('../models/User');
const Inventario = require('../models/Inventario');
const Sede = require('../models/Sede');
const Remito = require('../models/Remito');
const RemitoInventario = require('../models/RemitoInventario');
const Marca = require('../models/Marca');
const TipoArticulo = require('../models/Tipo_articulo');
const HistoricoInventario = require('../models/HistoricoInventario');
const Persona = require('../models/Persona');
const SedePersona = require('../models/Sede_Persona');
const Rol = require('../models/Rol');

const applyAssociations = () => {
  // Asociación entre Remito y RemitoInventario usando hasMany / belongsTo
  Remito.hasMany(RemitoInventario, { foreignKey: 'id_remito' });
  RemitoInventario.belongsTo(Remito, { foreignKey: 'id_remito' });

  // Asociación entre Inventario y RemitoInventario
  Inventario.hasMany(RemitoInventario, { foreignKey: 'id_inventario' });
  RemitoInventario.belongsTo(Inventario, { foreignKey: 'id_inventario' });

  // Otras asociaciones
  Remito.belongsTo(Sede, { foreignKey: 'id_sede' });
  Remito.belongsTo(User, { foreignKey: 'id_user' });
  Remito.belongsTo(Persona, { foreignKey: 'id_persona' });

  Inventario.belongsTo(Sede, { foreignKey: 'id_sede' });
  Inventario.belongsTo(Marca, { foreignKey: 'id_marca' });
  Inventario.belongsTo(TipoArticulo, { foreignKey: 'id_tipo_articulo' });

  Sede.belongsToMany(Persona, { through: SedePersona, foreignKey: 'id_sede' });
  Persona.belongsToMany(Sede, { through: SedePersona, foreignKey: 'id_persona' });

  SedePersona.belongsTo(Rol, { foreignKey: 'id_rol' });
  Rol.hasMany(SedePersona, { foreignKey: 'id_rol' });

  Persona.hasMany(SedePersona, { foreignKey: 'id_persona' });
  SedePersona.belongsTo(Persona, { foreignKey: 'id_persona' });

  Sede.hasMany(SedePersona, { foreignKey: 'id_sede' });
  SedePersona.belongsTo(Sede, { foreignKey: 'id_sede' });

  HistoricoInventario.belongsTo(Inventario, { foreignKey: 'id_inventario' });
  HistoricoInventario.belongsTo(Sede, { foreignKey: 'id_sede_destino' });
  HistoricoInventario.belongsTo(Remito, { foreignKey: 'id_remito' });
};

module.exports = { applyAssociations };
