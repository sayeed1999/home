import { Request, Response, NextFunction, RequestHandler } from "express";
import CustomError from "../../utils/errors/custom-error";

export const routeNotFoundHandler = (req: any, res: any, next: any) => {
  res
    .status(404)
    .json({ message: `Cant find ${req.originalUrl} on this server!` });
};

// Define a middleware function that wraps all controllers
export const catchErrors = (controller: RequestHandler) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await controller(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

// Middleware function to validate the JWT and set req.user
export const authenticate = (
  req: Request | any,
  res: Response | any,
  next: NextFunction
) => {
  const token = req.headers.authorization;
  try {
    // Verify the JWT and decode the payload
    const decoded = verifyToken(token);
    // Set the user data on the request object
    req.user = decoded;
    next();
  } catch (err) {
    // If the JWT is invalid, return an error
    res.status(401).send({ message: "Unauthorized" });
  }
};
