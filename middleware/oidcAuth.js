const { auth } = require('express-openid-connect');
const { authConfig } = require('../config/authConfig');

module.exports = auth(authConfig);
