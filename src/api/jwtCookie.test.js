/* eslint-env jest */
const { refreshJwtCookie, expireJwtCookie } = require('./jwtCookie');
const { verifyJwt } = require('../util/jwt');

const jwtSecret = 'jwt secret';

describe('jwt cookie middleware', () => {
  let ctx;
  beforeEach(() => {
    ctx = {
      state: {},
      cookies: {
        set: jest.fn(),
      },
    };
  });

  describe('refreshJwtCookie', () => {
    test('sets a jwt cookie if user is authenticated', async () => {
      const middleware = refreshJwtCookie(jwtSecret);
      const next = async () => {};

      ctx.state.user = { id: 'user id' };

      await middleware(ctx, next);
      expect(ctx.cookies.set).toHaveBeenCalledTimes(1);

      const token = ctx.cookies.set.mock.calls[0][1];
      const decoded = await verifyJwt(token, jwtSecret);

      expect(decoded.id).toBe('user id');
    });

    test('does nothing if user is not authenticated', async () => {
      const middleware = refreshJwtCookie(jwtSecret);
      const next = async () => {};

      await middleware(ctx, next);

      expect(ctx.cookies.set).not.toHaveBeenCalled();
    });
  });

  describe('expireJwtCookie', () => {
    test('sets jwt cookie to expire on a date in the past', async () => {
      const middleware = expireJwtCookie();
      const next = async () => {};

      const now = new Date();
      await middleware(ctx, next);

      expect(ctx.cookies.set).toHaveBeenCalled();
      const cookieOptions = ctx.cookies.set.mock.calls[0][2];
      expect(cookieOptions.expires < now).toBe(true);
    });
  });
});
