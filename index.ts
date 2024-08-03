import cors from "cors";
import dotenv from "dotenv";
import express, { Express } from "express";
import { routes } from "./features/routes";
import { errorHandler } from "./middleware/error.middleware";
import { notFoundHandler } from "./middleware/not-found.middleware";
import cookieParser from 'cookie-parser';


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
app.use(cookieParser());
// app.use(express.b)

// register routes
app.use(routes);

//register middleware
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`listening the app from port:${port}`);
});
