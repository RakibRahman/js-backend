import express, { Request, Response, Router } from "express";
import {
  validate
} from "../../middleware/validation.middleware";
import { idNumberRequestSchema, pagingRequestSchema } from "../Schema";
import {
  itemsOrderPostReqSchema,
  orderStatusPutRequestSchema,
} from "./orders.schema";
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
  validate(pagingRequestSchema),
  async (req: Request, res: Response) => {
    const data = pagingRequestSchema.parse(req);
    const { take, skip } = data.query;
    const orders = await getAllOrders(take, skip);
    res.json(orders);
  }
);

ordersRouter.get(
  "/:id",
  validate(idNumberRequestSchema),
  async (req: Request, res: Response) => {
    const id = idNumberRequestSchema.parse(req).params.id;
    const data = await getSingleOrder(id);

    data
      ? res.json(data)
      : res.status(404).json({ message: "No such order", status: 404 });
  }
);

ordersRouter.post(
  "/:id/items",
  validate(itemsOrderPostReqSchema),
  async (req: Request, res: Response) => {
    const {
      body,
      params: { id },
    } = itemsOrderPostReqSchema.parse(req);
    const data = await addItemsToOrder(id, body);
    data
      ? res.json(data)
      : res.status(404).json({ message: "No such order", status: 404 });
  }
);

ordersRouter.patch(
  "/:id",
  validate(orderStatusPutRequestSchema),
  async (req: Request, res: Response) => {
    const {
      params: { id },
      body,
    } = orderStatusPutRequestSchema.parse(req);

    const data = updateOrder(id, body as never);

    data
      ? res.json(data)
      : res.status(404).json({ message: "No such order", status: 404 });
  }
);

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
