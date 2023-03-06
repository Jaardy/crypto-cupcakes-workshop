module.exports = jest.fn((req, res, next) => {
  req.oidc = {
    user: {
      nickname: 'tester',
      name: 'also tester',
      email: '123@fake.com',
    },
  };

  next();
});
