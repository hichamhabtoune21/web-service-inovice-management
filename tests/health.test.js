const app = require('../lib/app').app;
const request = require("supertest");

describe('Health test', () => {
    test('', async () => {
      await request(app)
        .get('/health')
        .expect(200)
    })
  })
  