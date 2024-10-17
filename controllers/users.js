// controllers/users.js
const BaseService = require('../services/baseService');
const User = require('../models/User');

const userService = new BaseService(User);

const userGET = async (req, res) => {
  try {
    const usuarios = await userService.getAll();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const userActiveGET = async (req, res) => {
  try {
    const usuarios = await userService.getAll('nombre', { active: 1 });
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const userPOST = async (req, res) => {
  try {
    const userData = req.body;
    const newUser = await userService.create(userData);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



module.exports = {
    userGET,
    userActiveGET,
    userPOST
};
