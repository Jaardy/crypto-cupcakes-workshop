const cors = require('cors');
const express = require('express');
const app = express();
const { auth, requiresAuth } = require('express-openid-connect');
const { authConfig } = require('./config/authConfig');
const { checkRegisteredUser } = require('./middleware/checkRegisteredUser');

// middleware
app.use(cors());
app.use(auth(authConfig), checkRegisteredUser);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/cupcakes', requiresAuth(), require('./routes/cupcakes'));

app.get('/', (req, res) => {
  res.send('Home');
});

// error handling middleware
app.use((error, req, res, next) => {
  console.error('SERVER ERROR: ', error);
  if (res.statusCode < 400) res.status(500);
  res.send({ error: error.message, name: error.name, message: error.message });
});

module.exports = app;
