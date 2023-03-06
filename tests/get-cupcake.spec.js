const { describe, expect, it } = require('@jest/globals');
const request = require('supertest');
const app = require('../index');

const { User, Cupcake } = require('../models');
jest.mock('../middleware/oidcAuth');
jest.mock('../middleware/oidcRequiresAuth');
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
