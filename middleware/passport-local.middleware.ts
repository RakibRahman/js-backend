import passport from "passport";
import { Strategy } from "passport-local";
import { query } from "../db";
import { Tables } from "../db/table";
import { getAdmin } from "../features/admins/admins.service";
import { isValidPassword } from "../features/utils/hashPassword";

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
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
