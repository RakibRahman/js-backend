import cors from "cors";
import dotenv from "dotenv";
import express, { Express } from "express";
import { routes } from "./features/routes";
import { errorHandler } from "./middleware/error.middleware";
import { notFoundHandler } from "./middleware/not-found.middleware";
import cookieParser from 'cookie-parser';
import passport from 'passport'
import "./middleware/passport-local.middleware";
import { PostgresStore } from "./db";
import { passportMiddleware } from "./middleware/passport.middleware";
const session = require("express-session");
const store = new session.MemoryStore();

dotenv.config();
const port = process.env.PORT;

if (!port) {
  throw new Error("Missing required env variables");
}

const app: Express = express();

app.use(express.json());
app.use(cors({
  credentials: true
}));


app.use(
  session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: true,
    store:PostgresStore,
    cookie:{
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
      httpOnly: true,
      secure: false
    }
  })
);
app.use(passport.initialize())
app.use(passport.session());
// register routes
app.use(routes);




//register middleware
// app.use(passportMiddleware)
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`listening the app from port:${port}`);
});
