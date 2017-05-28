const { isEmail, isAlphanumeric } = require('validator');

function isValidUsername(username) {
  return (
    typeof username === 'string' &&
    isAlphanumeric(username) &&
    username.length > 1 &&
    username.length <= 20
  );
}

function isValidEmail(email) {
  return typeof email === 'string' && isEmail(email);
}

function isValidPassword(password) {
  return typeof password === 'string' && password.length >= 8;
}

module.exports = function() {
  return async function registrationValidation(ctx, next) {
    const { username, email, password, repeatPassword } = ctx.request.body;

    if (
      !isValidUsername(username) ||
      !isValidEmail(email) ||
      !isValidPassword(password) ||
      password !== repeatPassword
    ) {
      ctx.status = 400;
    } else {
      await next();
    }
  };
};
