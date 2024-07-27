import express, { NextFunction, Request, Response, Router } from "express";
import { validate } from "../../middleware/validation.middleware";
import { idNumberRequestSchema } from "../Schema";
import {
  addItem,
  deleteItem,
  getAllItems,
  getSingleItem,
  updateItem,
} from "./items.service";
import {
  itemPagingRequestSchema,
  itemPOSTRequestSchema,
  itemPUTRequestSchema,
} from "./items.schema";
import { create } from "xmlbuilder2";
import { pool } from "../../db";
import { log } from "console";

export const itemsRouter: Router = express.Router();

itemsRouter.get(
  "/",
  validate(itemPagingRequestSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        query: { page, size },
      } = itemPagingRequestSchema.parse(req);



      const items = await getAllItems(page,size);

      if (req.headers["accept"] === "application/xml" && items) {
        const root = create().ele("items");

        items.data.forEach((itm) => {
          root.ele("item", itm);
        });
        res.status(200).send(root.end({ prettyPrint: true }));
      } else {
        res.json(items);
      }
    } catch (error) {
      next(error);
    }
  }
);

itemsRouter.get(
  "/:id",
  validate(idNumberRequestSchema),
  async (req: Request, res: Response) => {
    const data = idNumberRequestSchema.parse(req);
    const id = data.params.id;
    const item = await getSingleItem(id);
    item
      ? res.json(item)
      : res.status(404).json({ message: "No such item", status: 404 });
  }
);

itemsRouter.post(
  "/",
  validate(itemPOSTRequestSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    const data = itemPOSTRequestSchema.parse(req);

    const {
      body: { name, price },
    } = data;

    try {
      const item = await addItem(name, price);
      res.status(201).json(item);
    } catch (error) {
      next({ code: error });
    }
  }
);

itemsRouter.put(
  "/:id",
  validate(itemPUTRequestSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    const data = itemPUTRequestSchema.parse(req);

    const {
      params: { id },
      body,
    } = data;

    try {
      const item = await updateItem(id, body!);
      item
        ? res.json(item)
        : res.status(404).json({ message: "No such item", status: 404 });
    } catch (error) {
      next(error);
    }
  }
);

itemsRouter.delete("/:id", async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const data = await deleteItem(id);

  data
    ? res.json(data)
    : res.status(404).json({ message: "No such item", status: 404 });
});
