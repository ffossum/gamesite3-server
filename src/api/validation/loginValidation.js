module.exports = function(userDb) {
  return async function loginValidation(ctx, next) {
    const { email, password } = ctx.request.body;

    const user = await userDb.getUserByEmail(email);

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
