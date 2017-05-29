/* eslint-env jest */
const request = require('supertest');
const app = require('./app');

describe('GET / (unauthenticated)', () => {
  test('responds with html', async () => {
    await request(app.callback())
      .get('/')
      .expect(200)
      .expect('Content-Type', /html/)
      .expect(res => {
        expect(res.text).toMatchSnapshot();
      });
  });
});
