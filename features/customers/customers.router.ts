import express, { Request, Response, Router } from "express";
import {
  deleteDelete,
  getAllCustomers,
  getCustomerOrders,
  getSingleCustomer,
  searchCustomers,
} from "./customers.service";

export const customersRouter: Router = express.Router();

customersRouter.get("/", async (req: Request, res: Response) => {
  const customers = await getAllCustomers();

  res.json(customers);
});

customersRouter.get("/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = await getSingleCustomer(id);

  data
    ? res.json(data)
    : res.status(404).json({ message: "No such customer", status: 404 });
});

customersRouter.delete("/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = await deleteDelete(id);

  data
    ? res.json(data)
    : res.status(404).json({ message: "No such customer", status: 404 });
});

customersRouter.get("/:id/orders", async (req: Request, res: Response) => {
  const id = req.params.id;
  const orders = await getCustomerOrders(id);
  orders.length
    ? res.json(orders)
    : res.status(404).json({ message: "Customer has no orders", status: 404 });
});

customersRouter.get("/search/:query", async (req: Request, res: Response) => {
  const query = req.params.query;
  const customers = await searchCustomers(query);

  customers.length
    ? res.json(customers)
    : res
        .status(404)
        .json({
          message: "No Customer found. try to be more specific",
          status: 404,
        });
});
