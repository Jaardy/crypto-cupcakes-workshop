require('dotenv').config({ path: `./config/.env.${process.env.NODE_ENV}` });
const cors = require('cors');
const express = require('express');
const app = express();
const oidcAuth = require('./middleware/oidcAuth');
const oidcRequiresAuth = require('./middleware/oidcRequiresAuth');

const { checkRegisteredUser } = require('./middleware/checkRegisteredUser');

// middleware
app.use(cors());
app.use(oidcAuth, checkRegisteredUser);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/cupcakes', oidcRequiresAuth, require('./routes/cupcakes'));

app.get('/', (req, res, next) => {
  res.send('Home');
});

// error handling middleware
app.use((error, req, res, next) => {
  console.error('SERVER ERROR: ', error);
  if (res.statusCode < 400) res.status(500);
  res.send({ error: error.message, name: error.name, message: error.message });
});

module.exports = app;
