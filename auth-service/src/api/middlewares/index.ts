import jwt from "jsonwebtoken";

export const routeNotFoundHandler = (req: any, res: any, next: any) => {
  res
    .status(404)
    .json({ message: `Cant find ${req.originalUrl} on this server!` });
};

export const globalErrorHandler = (err: any, req: any, res: any, next: any) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
};

// Middleware function to validate the JWT and set req.user
export const authenticate = (req: any, res: any, next: any) => {
  const token = req.headers.authorization;
  const secret = "12345678910111";
  try {
    // Verify the JWT and decode the payload
    const decoded = jwt.verify(token, secret);
    // Set the user data on the request object
    req.user = decoded;
    next();
  } catch (err) {
    // If the JWT is invalid, return an error
    res.status(401).send({ message: "Unauthorized" });
  }
};
