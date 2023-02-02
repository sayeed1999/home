import { Request, Response, NextFunction, RequestHandler } from "express";
import CustomError from "../../utils/errors/custom-error";
import { verifyToken } from "../../utils/helpers/jwt";

export const routeNotFoundHandler = (req: any, res: any, next: any) => {
  res
    .status(404)
    .json({ message: `Cant find ${req.originalUrl} on this server!` });
};

export const globalErrorHandler = (err: any, req: any, res: any, next: any) => {
  console.error(err.stack);
  if (err instanceof CustomError) {
    res.status(err.statusCode).json({ message: err.message });
  } else {
    res.status(500).json({ message: "Something went wrong" });
  }
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

// Middleware function to restrict one user update another user's info
// Note:- this middleware must get chained after authenticate middleware...
export const secureUpdateOrDelete = (
  req: Request | any,
  res: Response | any,
  next: NextFunction
) => {
  try {
    if (!req.user) res.status(401).send({ message: "Unauthorized" });

    if (!req.params.id && req.body.id && req.user.id !== req.body.id)
      throw Error("Cannot update another user's information");

    if (
      (req.params.id && req.user.id !== +req.params.id) ||
      (req.body.id && req.params.id && req.body.id !== +req.params.id)
    )
      throw Error("Cannot update another user's information");

    next();
  } catch (err: any) {
    res.status(403).send({ message: err.message || "Forbidden" });
  }
};
