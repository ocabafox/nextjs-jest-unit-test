const fp = require('lodash/fp');
const { createMocks } = require('node-mocks-http');
const GetUserById = require('./[id]');
const { runSeed } = require('../../../../database/helper');
const server = require('../../../../database');

describe('GET /api/get/user/[id]', () => {
  beforeEach(async () => {
    await runSeed(server);
  });

  it('Should return a user named "Luke Skywalker" with ID 1', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      query: {
        id: '1',
      },
    });

    await GetUserById(req, res);

    const userResponse = JSON.parse(res._getData());
    const users = fp.omit(['created_at', 'updated_at'])(userResponse);

    expect(res._getStatusCode()).toBe(200);
    expect(users).toEqual({
      eye_color: 'blue',
      gender: 'male',
      hair_color: 'blond',
      height: '172',
      id: 1,
      mass: '77',
      name: 'Luke Skywalker',
      skin_color: 'fair'
    });
  });

  test('Should return 404 if the user not found', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      query: {
        id: '99', // 99 is non existed user
      },
    });

    await GetUserById(req, res);

    expect(res._getStatusCode()).toBe(404);
  });
});
