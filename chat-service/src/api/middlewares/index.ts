import { NextFunction, RequestHandler } from "express";
import CustomError from "../../utils/errors/custom-error";

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
