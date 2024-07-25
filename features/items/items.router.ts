import express, { Request, Response, Router } from "express";
import { validate } from "../../middleware/validation.middleware";
import { idNumberRequestSchema } from "../Schema";
import {
  addItem,
  deleteItem,
  getAllItems,
  getSingleItem,
  updateItem,
} from "./items.service";
import { itemPOSTRequestSchema, itemPUTRequestSchema } from "./items.schema";
import { create } from "xmlbuilder2";

export const itemsRouter: Router = express.Router();

itemsRouter.get("/", async (req: Request, res: Response) => {
  const items = await getAllItems();

  if (req.headers["accept"] === "application/xml") {
    const root = create().ele("items");

    items.forEach((itm) => {
      root.ele("item", itm);
    });
    res.status(200).send(root.end({ prettyPrint: true }));
  } else {
    res.json(items);
  }
});

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
  async (req: Request, res: Response) => {
    const data = itemPOSTRequestSchema.parse(req);

    const {
      body: { name, price },
    } = data;

    const item = await addItem(name, price);
    item
      ? res.status(201).json(item)
      : res.status(500).json({
          message: "Creation failed",
        });
  }
);

itemsRouter.put(
  "/:id",
  validate(itemPUTRequestSchema),
  async (req: Request, res: Response) => {
    const data = itemPUTRequestSchema.parse(req);

    const {
      params: { id },
      body,
    } = data;
    const item = updateItem(id, body);

    item
      ? res.json(item)
      : res.status(404).json({ message: "No such item", status: 404 });
  }
);

itemsRouter.delete("/:id", async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const data = await deleteItem(id);

  data
    ? res.json(data)
    : res.status(404).json({ message: "No such item", status: 404 });
});
