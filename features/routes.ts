import express, { Router } from "express";
import { itemsRouter } from "./items/items.router";
import { customersRouter } from "./customers/customers.router";
import { ordersRouter } from "./orders/orders.route";
import { query } from "../db";
import { log } from "console";

const ROUTE_PATHS = {
  ITEMS: "/items",
  CUSTOMERS: "/customers",
  ORDERS: "/orders",
};

const apiRouter: Router = express.Router();

apiRouter.use(ROUTE_PATHS.ITEMS, itemsRouter);
apiRouter.use(ROUTE_PATHS.CUSTOMERS, customersRouter);
apiRouter.use(ROUTE_PATHS.ORDERS, ordersRouter);

export const routes: Router = express.Router();

routes.use("/api", apiRouter);
routes.get("/", (req, res) => {
  res.status(200).send("<h1>Server is ready!!</h1>");
});

routes.get("/delete/:table", async (req, res) => {
  const {
    params: { table },
  } = req;
  log({table})
  try {
    await query(`DROP TABLE IF EXISTS ${table}`);
    res.status(400).send(`${table} deleted successfully.`);
  } catch (err) {
    res.status(500).json({message:`Failed to delete ${table}:`, error:err});
  }
});
