const { Cupcake } = require('../models');

exports.getAll = async (req, res, next) => {
  try {
    const cupcakes = await Cupcake.findAll();
    res.send(cupcakes);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.getById = async (req, res, next) => {
  try {
    let { id } = req.params;
    const cupcake = await Cupcake.findByPk(id);
    if (cupcake) return res.send(cupcake);
    res.status(404).send('The cake is a lie! (Or maybe someone ate it)');
  } catch (error) {
    console.error(error);
    next(error);
  }
};
exports.postOne = async (req, res, next) => {
  res.sendStatus(200);
};
