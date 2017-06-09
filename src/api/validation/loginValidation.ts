import { Context } from 'koa';
import { User, toPublicUserData } from '../../db/users';

interface UserDb {
  getUserByEmail(email: string): Promise<User | undefined>;
}

export default function(userDb: UserDb) {
  return async function loginValidation(
    ctx: Context,
    next: () => Promise<any>
  ) {
    const { email, password } = ctx.request.body;

    const user = await userDb.getUserByEmail(email);

    if (!user || user.password !== password) {
      // TODO: hashed passwords
      ctx.status = 401;
    } else {
      ctx.state.user = toPublicUserData(user);
      await next();
    }
  };
}
