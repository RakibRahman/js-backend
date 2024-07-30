import { log } from "console";
import { query } from "../../db";
import { Tables } from "../../db/table";
import { hashPassword, isValidPassword } from "../utils/hashPassword";
import { Admin } from "./admin.schema";
import { generateJWT } from "../utils/generateToken";



export const adminRegistration = async (payload: Admin) => {
  const { name, email, password, role } = payload;
  const securedPassword = await hashPassword(password);
  const sql = `INSERT INTO ${Tables.ADMINS} (name,email,role,password) values($1,$2,$3,$4)`;
  try {
    const data = await query(sql, [name, email, role, securedPassword]);
    return data.rows[0];
  } catch (err: any) {
    if (err?.code === "23505" && err.constraint === "users_email_key") {
      err.detail;
      throw new Error(`Account already registered with ${email}`);
    }
    throw err;
  }
};

export const adminLogin = async (payload: Omit<Admin, "role" | "name">) => {
  const { email, password } = payload;

  const sql = `SELECT * FROM ${Tables.ADMINS} WHERE email=$1;`;

  try {
    const admin = await query(sql, [email]);
    const user = admin.rows[0];

    if (!user) {
      throw new Error("No Such Email");
    }

    const verifyPassword = await isValidPassword(user.password, password);

    if(verifyPassword){
      const data = {id:user.id,role:user.role,email,name:user.name}
      const token = generateJWT(data)
      return {data,token}
    }else {
      throw Error("Password does not match!");
    }

    

  } catch (error) {
    log("error:::>", error);
    throw error;
  }
};
