import express, { Request, Response, Router } from "express";
import { paginationValidationHandler } from "../../middleware/validation.middleware";
import {
  addItemsToOrder,
  deleteItemFromOrder,
  getAllOrders,
  getSingleOrder,
  updateOrder,
} from "./orders.service";

export const ordersRouter: Router = express.Router();

ordersRouter.get(
  "/",
  paginationValidationHandler,
  async (req: Request, res: Response) => {
    const { query } = req;
    const { take, skip } = query;
    //validate with zod
    const isValidTake = take && typeof take === "string" && parseInt(take) > 0;
    const isValidSkip = skip && typeof skip === "string" && parseInt(skip) > -1;

    if (isValidSkip && isValidTake) {
      const orders = await getAllOrders(parseInt(take), parseInt(skip));
      res.json(orders);
    }
  }
);

ordersRouter.get("/:id", async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const data = await getSingleOrder(id);

  data
    ? res.json(data)
    : res.status(404).json({ message: "No such order", status: 404 });
});

ordersRouter.post("/:id/items", async (req: Request, res: Response) => {
  const { body, params } = req;
  const orderId = parseInt(params.id);
  const data = await addItemsToOrder(orderId, body);
  data
    ? res.json(data)
    : res.status(404).json({ message: "No such order", status: 404 });
});

ordersRouter.patch("/:id", async (req: Request, res: Response) => {
  //validate with zod
  const { params, body } = req;
  const orderId = parseInt(params.id);
  const data = updateOrder(orderId, body);

  data
    ? res.json(data)
    : res.status(404).json({ message: "No such order", status: 404 });
});

ordersRouter.delete(
  "/:id/items/:itemId",
  async (req: Request, res: Response) => {
    const { params } = req;
    const orderId = parseInt(params.id);
    const itemId = parseInt(params.itemId);
    const data = await deleteItemFromOrder(orderId, itemId);

    data
      ? res.json(data)
      : res.status(404).json({ message: "No such order or Item", status: 404 });
  }
);
