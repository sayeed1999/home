import jwt from "jsonwebtoken";

const secret = "12345678910111";

export const generateToken = (user: any) => {
  const { id, email, name } = user;
  const payload = {
    id,
    email,
    name,
  };
  // Sign the JWT using the secret key and return it
  return jwt.sign(payload, secret, { expiresIn: "100h" });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, secret);
};
