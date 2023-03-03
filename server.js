require('dotenv').config('.env');
const app = require('./index');
const { PORT = 3000 } = process.env;
console.log('PORT');
app.listen(PORT, () => {
  console.log(`Cupcakes are ready at http://localhost:${PORT}`);
});
