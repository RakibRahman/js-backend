import { Strategy } from "passport-local";
import { NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import passport from "passport";
import { log } from "console";
import { Tables } from "../db/table";
import { query } from "../db";
import { generateJWT } from "../features/utils/generateToken";
import { isValidPassword } from "../features/utils/hashPassword";
import { getAdmin } from "../features/admins/admins.service";

passport.serializeUser((user: any, done) => {
    log('inside serial')
  done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
    log('inside deserial')

  try {
    const admin = await getAdmin(id);

    if (!admin) {
      throw new Error("Admin not found");
    }
    done(null, admin);
  } catch (err) {
    done(err, null);
  }
});

export default passport.use(
  new Strategy({ usernameField: "email" }, async (username, password, cb) => {
    log({ username });
    const sql = `SELECT * FROM ${Tables.ADMINS} WHERE email=$1;`;
    const admin = await query(sql, [username]);
    const user = admin.rows[0];
    if (!user) return cb(null, false);

    const verifyPassword = await isValidPassword(user.password, password);

    if (verifyPassword) {
      const data = {
        id: user.id,
        role: user.role,
        email: username,
        name: user.name,
      };
      cb(null, data);
    } else {
      cb(null, false);
    }
  })
);
