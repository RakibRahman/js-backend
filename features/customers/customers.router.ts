import express, { Request, Response, Router } from "express";
import {
  deleteDelete,
  getAllCustomers,
  getCustomerOrders,
  getSingleCustomer,
  searchCustomers,
} from "./customers.service";
import { validate } from "../../middleware/validation.middleware";
import { idUUIDRequestSchema } from "../Schema";
import { customerSearchSchema } from "./customers.schema";
import { log } from "console";

export const customersRouter: Router = express.Router();

customersRouter.get("/", async (req: Request, res: Response) => {
  const customers = await getAllCustomers();

  res.json(customers);
});

customersRouter.get("/:id",validate(idUUIDRequestSchema),  async (req: Request, res: Response) => {

  const data = idUUIDRequestSchema.parse(req);
  const id = data.params.id;
  const customer = await getSingleCustomer(id);

  customer
    ? res.json(customer)
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

customersRouter.get("/search/:query",validate(customerSearchSchema), async (req: Request, res: Response) => {
  const data = customerSearchSchema.parse(req)
  const query = data.params.query
log(data)
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
