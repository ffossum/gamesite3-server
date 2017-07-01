import { Context } from "koa";
import { IUser, toPrivateUserData } from "../../db/users";

interface IUserDb {
  getUserByEmail(email: string): Promise<IUser | undefined>;
}

export default function(userDb: IUserDb) {
  return async function loginValidation(
    ctx: Context,
    next: () => Promise<any>,
  ) {
    const { email, password } = ctx.request.body;

    const user = await userDb.getUserByEmail(email);

    if (!user || user.password !== password) {
      // TODO: hashed passwords
      ctx.status = 401;
    } else {
      ctx.state.user = toPrivateUserData(user);
      await next();
    }
  };
}
