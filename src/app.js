const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

router.get('/', (ctx, next) => {
  ctx.body = `<!doctype html>

<html lang="en">
<head>
  <meta charset="utf-8">
  <title>The HTML5 Herald</title>
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
