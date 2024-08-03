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

  if (!token) {
    return res.json({ status: 403, message: "unauthorized user" }); // Forbidden
  }

  jwt.verify(token, env.JWT_SECRET!, (err: any, user: any) => {
    if (err) {
      return res.json({ status: 403, message: "unauthorized user" });
    }
    log({ user, token });
    req.body = user as never;
    next();
  });
};
