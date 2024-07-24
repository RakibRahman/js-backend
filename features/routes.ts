import express, { Router } from "express";
import { itemsRouter } from "./items/items.router";
import { customersRouter } from "./customers/customers.router";
import { ordersRouter } from "./orders/orders.route";

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
