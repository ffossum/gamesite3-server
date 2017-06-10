import { Context } from "koa";
import { signJwt } from "../util/jwt";

const JWT_COOKIE = "jwt";
const EXPIRATION_AGE = 604800000; // 7 days

function getExpirationDate() {
  return new Date(Number(new Date()) + EXPIRATION_AGE);
}

export function refreshJwtCookie(jwtSecret: string) {
  return async (ctx: Context, next: () => Promise<any>) => {
    if (ctx.state.user) {
      const jwt = await signJwt(
        {
          id: ctx.state.user.id,
          username: ctx.state.user.username,
        },
        jwtSecret,
        {
          expiresIn: "7d",
        },
      );

      ctx.cookies.set(JWT_COOKIE, jwt, {
        expires: getExpirationDate(),
        httpOnly: true,
      });
    }
    await next();
  };
}

function lastWeek() {
  return new Date(Number(new Date()) - EXPIRATION_AGE);
}

export function expireJwtCookie() {
  return async (ctx: Context, next: () => Promise<any>) => {
    ctx.cookies.set(JWT_COOKIE, undefined, {
      expires: lastWeek(),
      httpOnly: true,
    });

    await next();
  };
}
