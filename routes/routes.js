const userRoutes = require('./users');
const authRoutes = require('./auth');
// Add other route imports here...

function initializeRoutes(app) {
  app.use('/user', userRoutes);
  app.use('/auth', authRoutes);
  
  // Add other routes here...

  // Manejo centralizado de errores
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo salió mal!');
  });
}

module.exports = initializeRoutes;
