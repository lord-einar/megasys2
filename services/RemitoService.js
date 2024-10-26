const { Remito, RemitoInventario, Inventario, sequelize } = require('../models');
const HistoricoInventarioService = require('./historicoInventarioService');

const logger = require('../config/logger');
const Sede = require('../models/Sede');
const User = require('../models/User');
const Persona = require('../models/Persona');
const ejs = require('ejs');
const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');
const Marca = require('../models/Marca');
const TipoArticulo = require('../models/Tipo_articulo');

class RemitoService {
  static async crearRemitoConArticulos(data) {
    const { id_sede, id_persona, id_user, fecha_remito, articulos } = data;
    const transaction = await sequelize.transaction();

    try {
      // Crear el remito
      const nuevoRemito = await Remito.create(
        { id_sede, id_persona, id_user, fecha_remito },
        { transaction }
      );

      // Procesar los artículos en paralelo usando Promise.all
      await Promise.all(
        articulos.map(async (articulo) => {
          const inventario = await Inventario.findByPk(articulo.id_inventario, { transaction });

          // Registrar en remito_inventario
          await RemitoInventario.create(
            {
              id_remito: nuevoRemito.id_remito,
              id_inventario: inventario.id_inventario,
              es_prestamo: articulo.es_prestamo || false,
              fecha_devolucion: articulo.fecha_devolucion || null,
              observaciones: articulo.observaciones || '',
            },
            { transaction }
          );

          // Registrar movimiento en historico_inventario
          await HistoricoInventarioService.registrarMovimiento(
            inventario.id_inventario,
            inventario.id_sede,
            id_sede,
            nuevoRemito.id_remito,
            transaction
          );

          // Actualizar sede del inventario
          await inventario.update({ id_sede }, { transaction });
        })
      );

      // Generar PDF del remito
      const pdfPath = await RemitoService.generarPDFRemito(nuevoRemito, articulos);

      await transaction.commit(); // Confirmar la transacción
      logger.info(`Remito creado con ID: ${nuevoRemito.id_remito}`);
      return { remito: nuevoRemito, pdfPath };
    } catch (error) {
      await transaction.rollback(); // Hacer rollback en caso de error
      logger.error(`Error creando remito: ${error.message}`);
      throw error;
    }
  }

  static async generarPDFRemito(remito, articulos) {
    let browser;
    try {
      const remitosFolderPath = path.join(__dirname, '../../remitos');
  
      // Crear la carpeta si no existe
      if (!fs.existsSync(remitosFolderPath)) {
        fs.mkdirSync(remitosFolderPath, { recursive: true });
        logger.info(`Carpeta creada en: ${remitosFolderPath}`);
      }
  
      // Obtener persona, sede y usuario en paralelo
      const [persona, sede, user] = await Promise.all([
        Persona.findByPk(remito.id_persona, { attributes: ['nombre', 'apellido'] }),
        Sede.findByPk(remito.id_sede, { attributes: ['nombre'] }),
        User.findByPk(remito.id_user, { attributes: ['nombre'] }),
      ]);
  
      // Obtener inventarios y combinar con los datos adicionales del frontend
      const inventarios = await Promise.all(
        articulos.map(async (articulo) => {
          const inventario = await Inventario.findByPk(articulo.id_inventario, {
            include: [
              { model: Marca, attributes: ['nombre']},
              { model: TipoArticulo, attributes: ['nombre']},
            ],
          });
  
          return {
            ...inventario.get(), // Obtener los datos del inventario
            es_prestamo: articulo.es_prestamo || false,
            fecha_devolucion: articulo.fecha_devolucion || 'N/A',
          };
        })
      );
  
  
      // Renderizar el template EJS
      const templatePath = path.join(__dirname, '../views/remitoTemplate.ejs');
      const html = await ejs.renderFile(templatePath, {
        remito,
        persona,
        sede,
        user,
        inventarios,
      });
  
      // Generar el PDF con Puppeteer
      const pdfPath = path.join(remitosFolderPath, `remito_${remito.id_remito}.pdf`);
      browser = await puppeteer.launch({ headless: true });
      const page = await browser.newPage();
      await page.setContent(html, { waitUntil: 'networkidle0' });
      await page.pdf({ path: pdfPath, format: 'A4' });
  
      logger.info(`PDF generado en: ${pdfPath}`);
      return pdfPath;
    } catch (error) {
      logger.error(`Error generando PDF: ${error.message}`);
      throw new Error('Error generando PDF del remito');
    } finally {
      if (browser) await browser.close(); // Cerrar el navegador aunque ocurra un error
    }
  }
  

  static async obtenerRemitoPorId(id_remito) {
    try {
      return await Remito.findByPk(id_remito, {
        include: [
          { model: Sede, attributes: ['nombre'] },
          { model: User, attributes: ['nombre'] },
          { model: Persona, attributes: ['nombre', 'apellido'] },
          {
            model: RemitoInventario,
            attributes: ['id_inventario', 'es_prestamo', 'fecha_devolucion', 'observaciones', 'devuelto'],
            include: [
              {
                model: Inventario,
                attributes: ['id_inventario', 'modelo', 'service_tag', 'num_serie'],
              },
            ],
          },
        ],
      });
    } catch (error) {
      logger.error(`Error obteniendo remito: ${error.message}`);
      throw error;
    }
  }

  static async listarRemitos() {
    try {
      return await Remito.findAll({
        include: [{ model: Sede, attributes: ['nombre'] }],
      });
    } catch (error) {
      logger.error(`Error listando remitos: ${error.message}`);
      throw error;
    }
  }
}

module.exports = RemitoService;
