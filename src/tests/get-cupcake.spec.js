const { describe, expect, it } = require('@jest/globals');
const request = require('supertest');
const app = require('../index');
const { User, Cupcake } = require('../models');
const { users, cupcakes } = require('../utils/seedData');

jest.mock('../middleware/oidcAuth');
const oidcAuth = require('../middleware/oidcAuth');

jest.mock('../middleware/oidcRequiresAuth');

describe('CUPCAKES', () => {
  describe('GET /cupcakes', () => {
    beforeAll(async () => {
      await User.sync();
      await Cupcake.sync();
      // await User.bulkCreate(users);
      await Cupcake.bulkCreate(cupcakes);
    });
    beforeEach(() => {
      // let req = request(app).get('/cupcakes').set('Accept', 'application/json');
      oidcAuth.mockImplementation((req, res, next) => {
        req.oidc = { user: users[0] };
        next();
      });
    });
    it('fails with unauthorised user request', (done) => {
      oidcAuth.mockImplementation((req, res, next) => next());

      request(app).get('/cupcakes').set('Accept', 'application/json').expect(403, done);
    });
    it('succeeds', (done) => {
      request(app).get('/cupcakes').set('Accept', 'application/json').expect(200, done);
    });

    it("responds with 'application/json'", (done) => {
      request(app).get('/cupcakes').set('Accept', 'application/json').expect('Content-Type', /json/, done);
    });

    it('responds with a collection of resources', (done) => {
      request(app)
        .get('/cupcakes')
        .set('Accept', 'application/json')
        .end((err, { text }) => {
          if (err) {
            throw err;
          }

          const resources = JSON.parse(text);

          try {
            expect(Array.isArray(resources)).toBe(true);
            expect(
              resources.every(
                ({ title, flavor, stars, createdAt, updatedAt }) => title && flavor && stars && createdAt && updatedAt
              )
            ).toBe(true);
            done();
          } catch (error) {
            console.log(resources);
            done(error);
          }
        });
    });
  });
});
