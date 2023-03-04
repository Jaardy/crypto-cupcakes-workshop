const path = require('path');
const { Sequelize } = require('sequelize');

let sequelize;
if (process.env.NODE_ENV == 'development') {
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, 'db.sqlite'),
    logging: false,
  });
}
if (process.env.NODE_ENV == 'testing') {
  sequelize = new Sequelize('sqlite::memory:', { logging: false });
}

module.exports = {
  sequelize,
  Sequelize,
};
