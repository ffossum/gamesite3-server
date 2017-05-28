const { getUserByEmail } = require('../../db/users');

module.exports = function() {
  return async function loginValidation(ctx, next) {
    const { email, password } = ctx.request.body;

    const user = await getUserByEmail(email);

    if (!user || user.password !== password) {
      // TODO: hashed passwords
      ctx.status = 401;
    } else {
      ctx.state.user = {
        id: user.id,
        username: user.username,
      };
      await next();
    }
  };
};
