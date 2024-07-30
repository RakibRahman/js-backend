import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Admin } from "../admins/admin.schema";

type JwtTokenPayload = { id: string } & Pick<Admin, "email" | "name" | "role">;
dotenv.config();
const env = process.env;

export const generateJWT = (payload: JwtTokenPayload, expiresIn = "1h") =>{
  return jwt.sign(payload, env.JWT_SECRET!, { expiresIn });
}
