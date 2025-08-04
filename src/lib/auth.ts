import jwt, { SignOptions } from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "my-secret-key";

export function signToken(payload: object, expiresIn: string = "1d") {
  return jwt.sign(payload, SECRET, { expiresIn } as SignOptions);
}
