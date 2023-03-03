const { User } = require('../models');

exports.checkRegisteredUser = async (req, res, next) => {
  if (req.oidc.user) {
    const [user] = await User.findOrCreate({
      where: {
        username: req.oidc.user.nickname,
        name: req.oidc.user.name,
        email: req.oidc.user.email,
      },
    });
  }
  next();
};
