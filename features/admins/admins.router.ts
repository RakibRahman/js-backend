import express, { NextFunction, Request, Response, Router } from "express";
import { query } from "../../db";
import { validate } from "../../middleware/validation.middleware";
import { adminLoginSchema, adminRegistrationPostSchema } from "./admin.schema";
import { adminLogin, adminRegistration } from "./admins.service";
import { verifyToken } from "../../middleware/verify-token.middleware";
export const adminsRouter: Router = express.Router();

adminsRouter.get(
  "/",
  verifyToken,
  async (req: Request, res: Response, next) => {
    try {
      const admins = await query(`SELECT id,name,role,email FROM admins;`);
      res.status(200).json(admins.rows);
    } catch (error) {
      next(error);
    }
  }
);

adminsRouter.post(
  "/register",
  validate(adminRegistrationPostSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    const { body } = adminRegistrationPostSchema.parse(req);
    try {
      await adminRegistration(body);
      res.status(201).send("Registration Success");
    } catch (error) {
      res.status(401);
      next(error);
    }
  }
);

adminsRouter.post(
  "/login",
  validate(adminLoginSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    const { body } = adminLoginSchema.parse(req);
    try {
      const data = await adminLogin(body);
      data &&
        res
          .cookie("access_token", data.token, {
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 7,
          })
          .status(200)
          .json({ message: "Logged in successfully" });
    } catch (error) {
      res.status(401);
      next(error);
    }
  }
);
