import express, { Request, Response, Router } from "express";
import {
  addItem,
  deleteItem,
  getAllItems,
  getSingleItem,
  updateItem,
} from "./items.service";
import { log } from "console";

export const itemsRouter: Router = express.Router();

itemsRouter.get("/", async (req: Request, res: Response) => {
  const items = await getAllItems();

  res.json(items);
});

itemsRouter.get("/:id", async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const data = await getSingleItem(id);

  data
    ? res.json(data)
    : res.status(404).json({ message: "No such item", status: 404 });
});

itemsRouter.post("/", async (req: Request, res: Response) => {
  //validate with zod
  const {
    body: { name, price },
  } = req;

  const data = await addItem(name, price);
  data
    ? res.json(data)
    : res.status(500).json({
        message: "Creation failed",
        details: "Name and price is required. Price must be number",
        status: 500,
      });
});

itemsRouter.put("/:id", async (req: Request, res: Response) => {
  //validate with zod
  const { params, body } = req;
  const itemId = parseInt(params.id);
  const data = updateItem(itemId, body);

  data
    ? res.json(data)
    : res.status(404).json({ message: "No such item", status: 404 });
});

itemsRouter.delete("/:id", async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const data = await deleteItem(id);

  data
    ? res.json(data)
    : res.status(404).json({ message: "No such item", status: 404 });
});
