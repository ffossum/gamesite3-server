import * as jwt from "jsonwebtoken";
import { promisify } from "util";

export const verifyJwt = promisify(jwt.verify);
export const signJwt = promisify(jwt.sign);
