import * as Router from 'koa-router';
import * as bodyParser from 'koa-bodyparser';

import { refreshJwtCookie } from './jwtCookie';
import registrationValidation from './validation/registrationValidation';
import loginValidation from './validation/loginValidation';
import * as userDb from '../db/users';

const jwtSecret = process.env.JWT_SECRET;

const apiRouter = new Router();

apiRouter.get('/users', async ctx => {
  let userIds = ctx.request.query.id || [];
  if (typeof userIds === 'string') {
    userIds = [userIds];
  }

  const users = await userDb.getUsersById(userIds);
  const publicUserData = users
    .filter(user => user)
    .map(user => user && userDb.toPublicUserData(user));

  ctx.body = users;
});

apiRouter.post(
  '/registration',
  bodyParser(),
  registrationValidation(),
  async (ctx, next) => {
    const { id } = await userDb.addUser(ctx.request.body);
    ctx.state.user = {
      id,
      username: ctx.request.body.username,
    };
    await next();
  },
  refreshJwtCookie(jwtSecret),
  ctx => {
    ctx.body = {
      id: ctx.state.user.id,
      username: ctx.state.user.username,
    };
    ctx.status = 201;
  }
);

apiRouter.post(
  '/login',
  bodyParser(),
  loginValidation(userDb),
  refreshJwtCookie(jwtSecret),
  ctx => {
    ctx.body = {
      id: ctx.state.user.id,
      username: ctx.state.user.username,
    };
    ctx.status = 200;
  }
);

apiRouter.get('*', ctx => {
  ctx.status = 404;
});

export default apiRouter;
