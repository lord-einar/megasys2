const User = require("../models/User");
const dbHelpers = require("../utils/dbHelpers");


const userGET = async (req, res) => {
  try {
    const usuarios = await dbHelpers.findAllOrdered(User);
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const userActiveGET = async (req, res) => {
  try {
    const usuarios = await dbHelpers.findAllOrdered(User, 'nombre', { active: 1 });
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const userPOST = async (req, res) => {
  const { nombre, user } = req.body;

  await User.sync({ force: false });
  const usuarios = await User.create({ nombre, user });

  res.json(usuarios);
};


module.exports = {
    userGET,
    userActiveGET,
    userPOST
};
