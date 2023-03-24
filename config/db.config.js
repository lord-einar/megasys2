const { Sequelize } = require("sequelize");

const dbConnect = () => {
  const sequelize = new Sequelize(
    process.env.DATABASE,
    process.env.USER,
    process.env.PASS,
    {
      host: "localhost",
      dialect: "mysql",
    }
  );

  sequelize
    .authenticate()
    .then(() => {
      console.log("Base de datos conectada");
    })
    .catch((error) => {
      console.log("Error:", error);
    });
};

module.exports = {dbConnect};
