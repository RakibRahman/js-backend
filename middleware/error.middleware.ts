import { log } from "console";
import { NextFunction, Request, Response } from "express";

export const errorHandler = (
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const status = response.statusCode ?? 500;
  const message = status === 500 ? "Internal Server Error" : null;
log('middleware error',error)
  response.status(status).json({ status, message, error: error.message });
};
