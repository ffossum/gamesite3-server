const Router = require('koa-router');
const shortid = require('shortid');
const { refreshJwtCookie } = require('./jwtCookie');

const jwtSecret = process.env.JWT_SECRET;

const apiRouter = new Router();

apiRouter.post(
  '/registration',
  async (ctx, next) => {
    ctx.state.user = { id: shortid.generate() };
    await next();
  },
  refreshJwtCookie(jwtSecret),
  ctx => {
    ctx.body = ctx.state.user;
    ctx.status = 201;
  }
);

apiRouter.get('*', ctx => {
  ctx.status = 404;
});

module.exports = apiRouter;
