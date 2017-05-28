const Koa = require('koa');
const Router = require('koa-router');
const jwt = require('koa-jwt');
const apiRouter = require('./api/apiRouter');
const { expireJwtCookie } = require('./api/jwtCookie');

const jwtSecret = process.env.JWT_SECRET;

const app = new Koa();
const router = new Router();

router.use('/api', apiRouter.routes(), apiRouter.allowedMethods());

router.get(
  '/registration',
  jwt({ secret: jwtSecret, cookie: 'jwt', passthrough: true }),
  async (ctx, next) => {
    if (ctx.state.user) {
      ctx.redirect('/');
    }

    await next();
  }
);

router.get('/logout', expireJwtCookie(), ctx => {
  ctx.redirect('back');
});

router.get(
  '*',
  jwt({ secret: jwtSecret, cookie: 'jwt', passthrough: true }),
  ctx => {
    ctx.body = `<!doctype html>

<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Gamesite 3</title>
  <script src="//localhost:8080/scripts/bundle.js" defer></script>
</head>

<body>
  <div id="root"></div>
</body>
</html>
`;
  }
);

app.use(router.routes(), router.allowedMethods());

module.exports = app;
