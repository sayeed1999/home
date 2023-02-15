import jwt from "jsonwebtoken";

const secret = "12345678910111";

export const verifyToken = (token: string) => {
  return jwt.verify(token, secret);
};
