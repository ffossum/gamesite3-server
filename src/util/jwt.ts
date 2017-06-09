import { promisify } from 'util';
import * as jwt from 'jsonwebtoken';

export const verifyJwt = promisify(jwt.verify);
export const signJwt = promisify(jwt.sign);
