const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

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

app.use(router.routes());
app.use(router.allowedMethods());

module.exports = app;
