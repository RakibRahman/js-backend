import express, { Router, Express, Request, Response } from "express";
import { query } from "../../db";

export const adminsRouter: Router = express.Router();

adminsRouter.get("/", async (req: Request, res: Response, next) => {
  try {
    const admins = await query(`SELECT * FROM admins`);
    res.status(200).json(admins.rows);
  } catch (error) {
    next(error);
  }
});
