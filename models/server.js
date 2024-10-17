const express = require("express");
const cors = require("cors");
const sequelize = require("../config/dbConnect"); // Importar la instancia de sequelize única
const morgan = require("morgan");
const helmet = require("helmet");

class Server {
  constructor() {
    this.app = null;
    this.init();
  }

  async init() {
    try {
      await this.initDatabase();
      this.initExpress();
      this.initMiddlewares();
      this.initRoutes();
    } catch (error) {
      console.error("Error durante la inicialización del servidor:", error);
      throw error; // Lanzamos el error para detener la inicialización si algo falla
    }
  }

  async initDatabase() {
    try {
      await sequelize.sync({ alter: false }); // Sincronizar la base de datos solo una vez
      console.log("Base de datos sincronizada con éxito");
    } catch (error) {
      console.error("Error al conectar la base de datos:", error);
      throw error;
    }
  }

  initExpress() {
    this.app = express();
    this.port = process.env.PORT || 3000;
  }

  initMiddlewares() {
    if (!this.app) {
      throw new Error("Express no ha sido inicializado correctamente.");
    }

    this.app.use(helmet());
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.static("public"));
    this.app.use(morgan("dev"));
  }

  initRoutes() {
    if (!this.app) {
      throw new Error("Express no ha sido inicializado correctamente.");
    }

    this.app.use("/user", require("../routes/users"));
    // this.app.use("/empresa", require("../routes/empresa"));
    // this.app.use("/sedes", require("../routes/sedes"));
    // this.app.use("/personas", require("../routes/personas"));
    // this.app.use("/roles", require("../routes/roles"));
    // this.app.use("/servicios", require("../routes/servicios"));
    // this.app.use("/proveedores", require("../routes/proveedores"));
    // this.app.use("/inventario", require("../routes/inventario"));
    // this.app.use("/remitos", require("../routes/remitos"));
    // this.app.use("/sedepersona", require("../routes/sede_persona"));
    // this.app.use("/sedeservicio", require("../routes/sede_servicios"));
    // this.app.use("/servicioproveedor", require("../routes/servicio_proveedor"));
    // this.app.use("/tipo_articulo", require("../routes/tipo_articulo"));
    // this.app.use("/marcas", require("../routes/marcas"));
    // this.app.use("/", require('../routes/home'));

    // Manejo centralizado de errores
    this.app.use((err, req, res, next) => {
      console.error(err.stack);
      res.status(500).send('Algo salió mal!');
    });
  }

  listen() {
    if (!this.app) {
      throw new Error("Express no ha sido inicializado correctamente.");
    }

    this.app.listen(this.port, () => {
      console.log(`Servidor escuchando en http://localhost:${this.port}`);
    });
  }
}

module.exports = Server;
