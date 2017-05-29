/* eslint-env jest */
const loginValidation = require('./loginValidation');

describe('login validation middleware', () => {
  let ctx;
  let next;

  beforeEach(() => {
    ctx = {
      request: {
        body: {
          email: 'bob@test.com',
          password: 'bobisthebest',
        },
      },
      state: {},
    };
    next = async () => {
      ctx.status = 200;
    };
  });

  test('returns 401 if user is not found', async () => {
    const userDb = {
      getUserByEmail: async () => {},
    };
    const middleware = loginValidation(userDb);
    await middleware(ctx, next);

    expect(ctx.status).toBe(401);
  });

  test('return 401 if password is incorrect', async () => {
    const userDb = {
      getUserByEmail: async () => ({
        id: 'userid',
        username: 'bob',
        password: 'bobsucks',
      }),
    };
    const middleware = loginValidation(userDb);
    await middleware(ctx, next);

    expect(ctx.status).toBe(401);
  });

  test('authenticates user and passes through if login is valid', async () => {
    const userDb = {
      getUserByEmail: async () => ({
        id: 'userid',
        username: 'bob',
        password: 'bobisthebest',
      }),
    };

    const middleware = loginValidation(userDb);
    await middleware(ctx, next);

    expect(ctx.state.user).toEqual({
      id: 'userid',
      username: 'bob',
    });
    expect(ctx.status).toBe(200);
  });
});
