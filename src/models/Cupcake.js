const { Sequelize, sequelize } = require('../db/db');

const Cupcake = sequelize.define('cupcake', {
  title: Sequelize.STRING,
  flavor: Sequelize.STRING,
  stars: Sequelize.INTEGER,
});

module.exports = { Cupcake };
