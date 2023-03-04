const { describe, expect, it } = require('@jest/globals');
const request = require('supertest');
const app = require('../index');
const { oidcAuth } = require('../middleware/oidcAuth');
const { oidcRequiresAuth } = require('../middleware/oidcRequiresAuth');
const { User, Cupcake } = require('../models');
jest.mock('../middleware/oidcAuth', () =>
  jest.fn((req, res, next) => {
    req.oidc = {
      user: {
        nickname: 'tester',
        name: 'also tester',
        email: '123@fake.com',
      },
    };

    next();
  })
);
jest.mock('../middleware/oidcRequiresAuth', () => jest.fn((_req, _res, next) => next()));

describe('GET /', () => {
  beforeEach(async () => {
    await User.sync({ force: true });
    req = request(app).get('/').set('Accept', 'application/json');
  });

  it('succeeds', (done) => {
    req.end((err, { statusCode }) => {
      if (err) {
        throw err;
      }

      expect(statusCode).toBe(200);
      done();
    });
  });
});

describe('GET /cupcakes', () => {
  beforeAll(async () => {
    const { cupcakes } = require('../utils/seedData');
    console.log(cupcakes);
    await Cupcake.sync({ force: true });
    await Cupcake.bulkCreate(cupcakes);
  });
  beforeEach(() => {
    req = request(app).get('/cupcakes').set('Accept', 'application/json');
  });

  it('succeeds', (done) => {
    req.end((err, { statusCode }) => {
      if (err) {
        throw err;
      }

      expect(statusCode).toBe(200);
      done();
    });
  });

  it("responds with 'application/json'", (done) => {
    req.end((err, { headers }) => {
      if (err) {
        throw err;
      }

      expect(headers['content-type']).toContain('application/json');
      done();
    });
  });

  it('responds with an collection of resources', (done) => {
    req.end((err, { text }) => {
      if (err) {
        throw err;
      }

      const resources = JSON.parse(text);

      expect(Array.isArray(resources)).toBe(true);
      expect(resources[0]).toHaveProperty('title', 'flavor', 'stars');
      done();
    });
  });
});
