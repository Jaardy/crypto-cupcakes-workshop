const { users } = require('../../utils/seedData');
module.exports = jest.fn((req, res, next) => {
  req.oidc = { user: users[0] };
  next();
});
