const authRoutes = require('./auth');
const empresaRoutes = require('./empresas')
const sedesRoutes = require('./sedes')
const rolesRoutes = require('./rol')
const tipoArticuloRoutes = require('./tipoArticulo')
const marcasRoutes = require('./marcas')
const personaRoutes = require('./persona');
const sedePersonaRoutes = require('./sedePersona')
const inventarioRoutes = require('./inventario');
const userRoutes = require('./users');
const remitoRoutes = require('./remito');

// Add other route imports here...

function initializeRoutes(app) {
  app.use('/user', userRoutes);
  app.use('/auth', authRoutes);
  app.use('/empresas', empresaRoutes);
  app.use('/sedes', sedesRoutes);
  app.use('/roles', rolesRoutes);
  app.use('/tipo-articulo', tipoArticuloRoutes);
  app.use('/marcas', marcasRoutes);
  app.use('/persona', personaRoutes);
  app.use('/sede-persona', sedePersonaRoutes);
  app.use('/inventario', inventarioRoutes);
  app.use('/users', userRoutes);
  app.use('/remitos', remitoRoutes);

  

  // Manejo centralizado de errores
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo salió mal!');
  });
}

module.exports = initializeRoutes;
