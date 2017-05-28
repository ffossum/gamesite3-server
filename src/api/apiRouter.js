const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const { refreshJwtCookie } = require('./jwtCookie');
const registrationValidation = require('./validation/registrationValidation');
const loginValidation = require('./validation/loginValidation');
const { addUser } = require('../db/users');

const jwtSecret = process.env.JWT_SECRET;

const apiRouter = new Router();

apiRouter.post(
  '/registration',
  bodyParser(),
  registrationValidation(),
  async (ctx, next) => {
    const { id } = addUser(ctx.request.body);
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
  loginValidation(),
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

module.exports = apiRouter;
