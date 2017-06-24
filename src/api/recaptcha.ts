import { Context } from "koa";
import fetch from "node-fetch";

export default function createRecaptchaMiddleware(secret: string) {
  return async function recaptcha(ctx: Context, next: () => Promise<any>) {
    try {
      const response = await fetch(
        "https://www.google.com/recaptcha/api/siteverify",
        {
          body: `secret=${secret}&response=${ctx.request.body
            .recaptchaResponse}&remoteip=${ctx.request.ip}`,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          method: "POST",
        },
      );
      if (response.ok) {
        await next();
      } else {
        ctx.status = 400;
      }
    } catch (err) {
      ctx.status = 500;
    }
  };
}
