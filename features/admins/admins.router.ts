import express, { NextFunction, Request, Response, Router } from "express";
import passport from "passport";
import { query } from "../../db";
import { isAuthenticated } from "../../middleware/isAuthenticated.middleware";
import { validate } from "../../middleware/validation.middleware";
import { adminLoginSchema, adminRegistrationPostSchema } from "./admin.schema";
import { adminRegistration } from "./admins.service";

export const adminsRouter: Router = express.Router();

adminsRouter.get(
  "/",
  isAuthenticated,
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
  [validate(adminLoginSchema), passport.authenticate("local")],
  async (req: Request, res: Response, next: NextFunction) => {
    res.json({ status: 200, message: "Login Success" });
  }
);

adminsRouter.get("/auth/status", (req: Request, res: Response) => {
  const data = req.user;
  data ? res.json({ data }) : res.sendStatus(401);
});

adminsRouter.post(
  "/auth/logout",
  (req: Request, res: Response, next: NextFunction) => {
    res.clearCookie(req.sessionID); // Clear the session cookie

    req.logout(function (err) {
      if (err) {
        return next(err);
      }
      res.send("Logout Successful");
    });
  }
);
