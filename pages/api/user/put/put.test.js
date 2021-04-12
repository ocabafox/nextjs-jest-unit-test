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

  it('Should Update ID 1 named Luke Skywalker to Ricky Gwapo', async () => {
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
});
