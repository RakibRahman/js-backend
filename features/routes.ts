import express, { Router } from "express";
import { itemsRouter } from "./items/items.router";
import { customersRouter } from "./customers/customers.router";
import { ordersRouter } from "./orders/orders.route";
import { initializeDatabase, query } from "../db";
import { log } from "console";
import { adminsRouter } from "./admins/admins.router";

const ROUTE_PATHS = {
  ITEMS: "/items",
  CUSTOMERS: "/customers",
  ORDERS: "/orders",
  ADMINS: "/admins",
};

const apiRouter: Router = express.Router();

apiRouter.use(ROUTE_PATHS.ITEMS, itemsRouter);
apiRouter.use(ROUTE_PATHS.CUSTOMERS, customersRouter);
apiRouter.use(ROUTE_PATHS.ORDERS, ordersRouter);
apiRouter.use(ROUTE_PATHS.ADMINS, adminsRouter);

export const routes: Router = express.Router();

routes.use("/api", apiRouter);
routes.get("/", (req, res) => {
  res.status(200).send("<h1>Server is ready!!</h1>");
});

routes.get("/setup", async (req, res) => {
  initializeDatabase()
    .then(() => {
      res.send('Successfully initialized Database')
    })
    .catch((err) => {
      console.error("Failed to initialize database:", err);
      throw err;
    });
});

routes.delete("/delete/:table", async (req, res) => {
  const {
    params: { table },
  } = req;
  log({ table });
  try {
    await query(`DROP TABLE IF EXISTS ${table}`);
    res.status(400).send(`${table} deleted successfully.`);
  } catch (err) {
    res.status(500).json({ message: `Failed to delete ${table}:`, error: err });
  }
});
