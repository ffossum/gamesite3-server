const { signJwt } = require('../util/jwt');

const JWT_COOKIE = 'jwt';
const EXPIRATION_AGE = 604800000; // 7 days

function getExpirationDate() {
  return new Date(Number(new Date()) + EXPIRATION_AGE);
}

function refreshJwtCookie(jwtSecret) {
  return async (ctx, next) => {
    if (ctx.state.user) {
      const jwt = await signJwt({ user: 'asdf' }, jwtSecret, {
        expiresIn: '7d',
      });

      ctx.cookies.set(JWT_COOKIE, jwt, {
        httpOnly: true,
        expires: getExpirationDate(),
      });
    }
    await next();
  };
}

function lastWeek() {
  return new Date(Number(new Date()) - EXPIRATION_AGE);
}

function expireJwtCookie() {
  return async (ctx, next) => {
    ctx.cookies.set(JWT_COOKIE, false, {
      httpOnly: true,
      expires: lastWeek(),
    });

    await next();
  };
}

module.exports = {
  refreshJwtCookie,
  expireJwtCookie,
};
