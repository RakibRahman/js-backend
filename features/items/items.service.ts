import { Item } from "../types";

const items: Item[] = [
  { id: 1, name: "Item 1", price: 20 },
  { id: 2, name: "Item 2", price: 15 },
  { id: 3, name: "Item 3", price: 30 },
  { id: 4, name: "Item 4", price: 14 },
  { id: 5, name: "Item 5", price: 16 },
];

export const getAllItems = () => {
  return items;
};

export const getSingleItem = (id: number) => {
  return items.find((itm) => itm.id === id) ?? null;
};

export const deleteItem = (id: number) => {
  const item = items.find((it) => it.id === id);

  return item ? items.filter((item) => item.id !== id) : null;
};

export const addItem = (name: string, price: number) => {
  const item = { id: items.length + 1, name, price };
  items.push(item);

  return item;
};

export const updateItem = (id: number, payload: Omit<Item, "id">) => {
  const itemIndex = items.findIndex((i) => i.id === id);

  if (itemIndex === -1) return null;

  const data = { ...items[itemIndex], ...payload };

  items[itemIndex] = data;

  return data;
};
