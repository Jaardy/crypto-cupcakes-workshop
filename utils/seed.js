const { sequelize } = require('../db/db');
const seed = require('../db./utils/seedFn');

seed()
  .then(() => {
    console.log('Seeding success. Crypto Cupcakes to the Rescue!');
  })
  .catch((err) => {
    console.error(err);
  })
  .finally(() => {
    sequelize.close();
  });
