const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const shortid = require('shortid');
const { refreshJwtCookie } = require('./jwtCookie');
const registrationValidation = require('./validation/registrationValidation');
// const { getUserById } = require('../db/users');

const jwtSecret = process.env.JWT_SECRET;

const apiRouter = new Router();

apiRouter.post(
  '/registration',
  bodyParser(),
  registrationValidation(),
  async (ctx, next) => {
    ctx.state.user = {
      id: shortid.generate(),
      username: ctx.request.body.username,
    };
    await next();
  },
  refreshJwtCookie(jwtSecret),
  ctx => {
    ctx.body = { id: ctx.state.user.id };
    ctx.status = 201;
  }
);

apiRouter.get('*', ctx => {
  ctx.status = 404;
});

module.exports = apiRouter;
