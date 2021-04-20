const fp = require('lodash/fp');
const { createMocks } = require('node-mocks-http');
const PutUserById = require('./[id]');
const GetUserById = require('../get/[id]');
const { runSeed } = require('../../../../database/helper');
const server = require('../../../../database');

describe('GET /api/put/user/[id]', () => {
  beforeEach(async () => {
    await runSeed(server);
  });

  test('Should Update ID 1 named Luke Skywalker to Ricky Gwapo', async () => {
    const { req:firstReq, res:firstRes } = createMocks({
      method: 'PUT',
      query: {
        id: '1',
      },
    });

    await PutUserById(firstReq, firstRes);

    const userResponse = JSON.parse(firstRes._getData());
    const user1 = fp.omit(['created_at', 'updated_at'], userResponse);

    expect(firstRes._getStatusCode()).toBe(200);
    expect(user1).toEqual({
      id: 1,
      name: 'Ricky Gwapo',
      height: '172',
      mass: '77',
      hair_color: 'blond',
      skin_color: 'fair',
      eye_color: 'blue',
      gender: 'male'
    });

    // Check if ID 1 is updated using GET method
    const { req:secondReq, res:secondRes } = createMocks({
      method: 'GET',
      query: {
        id: '1',
      },
    });

    await GetUserById(secondReq, secondRes);

    const checkUserResponse = JSON.parse(secondRes._getData());
    const checkUser = fp.omit(['created_at', 'updated_at'], checkUserResponse);

    expect(secondRes._getStatusCode()).toBe(200);
    expect(checkUser).toEqual({
      id: 1,
      name: 'Ricky Gwapo',
      height: '172',
      mass: '77',
      hair_color: 'blond',
      skin_color: 'fair',
      eye_color: 'blue',
      gender: 'male',
    });
  });

  test('Should return a user named "Luke Skywalker" with ID 1', async () => {
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
});
