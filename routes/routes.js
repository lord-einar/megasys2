const userRoutes = require('./users');
// Add other route imports here...

function initializeRoutes(app) {
  app.use('/user', userRoutes);
  // Add other routes here...

  // Manejo centralizado de errores
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo salió mal!');
  });
}

module.exports = initializeRoutes;
