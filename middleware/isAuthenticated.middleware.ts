import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";

import { log } from "console";

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errorObj = { status: 403, message: "unauthorized user" };
  if (req.session && "passport" in req.session) {
    log({ ssssssssss: req.session });
    next();
  } else {
    res.json(errorObj);
  }
};
