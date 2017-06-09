import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as jwt from 'koa-jwt';
const apiRouter = require('./api/apiRouter');
const { expireJwtCookie } = require('./api/jwtCookie');

const jwtSecret = process.env.JWT_SECRET;

const app = new Koa();
const router = new Router();

router.use('/api', apiRouter.routes(), apiRouter.allowedMethods());

router.get(
  /\/(registration|login)\/?$/,
  jwt({ secret: jwtSecret, cookie: 'jwt', passthrough: true }),
  async (ctx: Koa.Context, next: () => Promise<any>) => {
    if (ctx.state.user) {
      ctx.redirect('/');
    }

    await next();
  }
);

router.get('/logout', expireJwtCookie(), (ctx: Koa.Context) => {
  ctx.redirect('back');
});

router.get(
  '*',
  jwt({ secret: jwtSecret, cookie: 'jwt', passthrough: true }),
  (ctx: Koa.Context) => {
    const user = ctx.state.user && {
      id: ctx.state.user.id,
      username: ctx.state.user.username,
    };

    const userTag = user
      ? `<script defer>window.__USER__ = ${JSON.stringify(user)};</script>`
      : '';

    ctx.body = `<!doctype html>

<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Gamesite 3</title>

  ${userTag}
  <script src="//localhost:8080/scripts/bundle.js" defer></script>
</head>

<body>
  <div id="root"></div>
</body>
</html>
`;
  }
);

app.use(router.routes());
app.use(router.allowedMethods());

export default app;
