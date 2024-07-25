import { NextFunction, Request, Response } from "express";

export const errorHandler = (
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const status = 500;
  const message = "Internal Server Error";

  response.status(status).json({ status, message });
};
