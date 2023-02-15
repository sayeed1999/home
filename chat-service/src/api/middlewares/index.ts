import { NextFunction, RequestHandler } from "express";
import CustomError from "../../utils/errors/custom-error";
import { verifyToken } from "../../utils/helpers/jwt";
import Provider from "../../models/provider";
const db = Provider.getInstance();

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
  return async (req: any, res: any, next: NextFunction) => {
    try {
      await controller(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

// Middleware function to validate the JWT and set req.user
export const authenticate = async (
  req: Request | any,
  res: Response | any,
  next: NextFunction
) => {
  const token = req.headers.authorization;
  try {
    // Verify the JWT and decode the payload
    const decoded: any = verifyToken(token);
    // Set the user data on the request object
    const userInDB = await db.User.findOne({ user_id: decoded.id });
    req.user = userInDB;
    next();
  } catch (err) {
    // If the JWT is invalid, return an error
    res.status(401).send({ message: "Unauthorized" });
  }
};
