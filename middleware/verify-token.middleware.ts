import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";

import { log } from "console";

dotenv.config();
const env = process.env;

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.access_token;

  const errorObj = { status: 403, message: "unauthorized user" };
  if (!token) {
    return res.json(errorObj); // Forbidden
  }

  jwt.verify(token, env.JWT_SECRET!, (err: any, user: any) => {
    if (err) {
      return res.json(errorObj);
    }
    log({ user, token });
    req.body = user as never;
    next();
  });
};
