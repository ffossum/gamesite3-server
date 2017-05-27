const Koa = require('koa');
const Router = require('koa-router');
const apiRouter = require('./api/apiRouter');

const app = new Koa();
const router = new Router();

router.use('/api', apiRouter.routes(), apiRouter.allowedMethods());

router.get('*', ctx => {
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
});

app.use(router.routes(), router.allowedMethods());

module.exports = app;
