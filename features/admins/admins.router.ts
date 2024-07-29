import express, { Router, Express, Request, Response } from "express";
import { query } from "../../db";
import { validate } from "../../middleware/validation.middleware";
import { adminRegistrationPostSchema } from "./admin.schema";

export const adminsRouter: Router = express.Router();

adminsRouter.get("/", async (req: Request, res: Response, next) => {
  try {
    const admins = await query(`SELECT * FROM admins`);
    res.status(200).json(admins.rows);
  } catch (error) {
    next(error);
  }
});


adminsRouter.post('/register',validate(adminRegistrationPostSchema), async (req: Request, res: Response, next)=>{
  const {body} = adminRegistrationPostSchema.parse(req);
  const {name,email,password,role} = body;


})
