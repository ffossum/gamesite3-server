import * as bodyParser from "koa-bodyparser";
import * as Router from "koa-router";
import fetch from "node-fetch";

import * as gameDb from "../db/games";
import * as userDb from "../db/users";

import { refreshJwtCookie } from "./jwtCookie";
import recaptcha from "./recaptcha";
import loginValidation from "./validation/loginValidation";
import registrationValidation from "./validation/registrationValidation";

const jwtSecret = process.env.JWT_SECRET;

const apiRouter = new Router();

apiRouter.get("/users", async ctx => {
  let userIds = ctx.request.query.id || [];
  if (typeof userIds === "string") {
    userIds = [userIds];
  }

  const users = await userDb.getUsersById(userIds);
  const publicUserData = users.map(user => userDb.toPublicUserData(user));

  ctx.body = publicUserData;
});

apiRouter.get("/game/:gameId", async ctx => {
  const gameId = ctx.params.gameId;
  const game = await gameDb.getGame(gameId);

  ctx.body = game;
});

apiRouter.post(
  "/registration",
  bodyParser(),
  registrationValidation(),
  recaptcha(process.env.RECAPTCHA_SECRET),
  async (ctx, next) => {
    const user = await userDb.addUser(ctx.request.body);
    ctx.state.user = userDb.toPrivateUserData(user);
    await next();
  },
  refreshJwtCookie(jwtSecret),
  ctx => {
    ctx.body = ctx.state.user;
    ctx.status = 201;
  },
);

apiRouter.post(
  "/login",
  bodyParser(),
  loginValidation(userDb),
  refreshJwtCookie(jwtSecret),
  ctx => {
    ctx.body = ctx.state.user;
    ctx.status = 200;
  },
);

apiRouter.get("*", ctx => {
  ctx.status = 404;
});

export default apiRouter;
