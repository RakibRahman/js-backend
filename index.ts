import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { routes } from "./features/routes";
import { notFoundHandler } from "./middleware/not-found.middleware";
import { errorHandler } from "./middleware/error.middleware";

dotenv.config();
const port = process.env.PORT;

if (!port) {
  throw new Error("Missing required env variables");
}

const app: Express = express();

app.use(express.json());

// register routes
app.use(routes);

//register middleware
app.use(errorHandler);
app.use(notFoundHandler);

app.listen(port, () => {
  console.log(`listening the app from port:${port}`);
});
