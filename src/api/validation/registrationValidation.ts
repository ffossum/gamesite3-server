import { Context } from 'koa';
import { isEmail, isAlphanumeric } from 'validator';

function isValidUsername(username: any) {
  return (
    typeof username === 'string' &&
    isAlphanumeric(username) &&
    username.length > 1 &&
    username.length <= 20
  );
}

function isValidEmail(email: any) {
  return typeof email === 'string' && isEmail(email);
}

function isValidPassword(password: any) {
  return typeof password === 'string' && password.length >= 8;
}

export default function() {
  return async function registrationValidation(
    ctx: Context,
    next: () => Promise<any>
  ) {
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
}
