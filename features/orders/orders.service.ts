import { Order } from "../types";

const orders: Order[] = [
  {
    id: 1,
    customerId: "98c7161f-d85e-4fdd-a737-8774aab5901e",
    items: [{ id: 1, name: "item 1" }],
    status: "processing",
  },
  {
    id: 2,
    customerId: "e104987e-807a-4968-b66b-7522f7205f52",
    items: [{ id: 2, name: "item 1" }],
    status: "completed",
  },
  {
    id: 3,
    customerId: "cad0c2bc-16b0-469b-ad0b-e12de19c0d10",
    items: [{ id: 3, name: "item 1" }],
    status: "processing",
  },
  {
    id: 4,
    customerId: "98c7161f-d85e-4fdd-a737-8774aab5901e",
    items: [{ id: 4, name: "item 1" }],
    status: "completed",
  },
  {
    id: 5,
    customerId: "2e485f2c-0cf4-49fa-beea-1ce015924293",
    items: [{ id: 5, name: "item 1" }],
    status: "processing",
  },
  {
    id: 6,
    customerId: "2e485f2c-0cf4-49fa-beea-1ce015924293",
    items: [{ id: 6, name: "item 1" }],
    status: "canceled",
  },
  {
    id: 7,
    customerId: "2e485f2c-0cf4-49fa-beea-1ce015924293",
    items: [{ id: 1, name: "item 1" }],
    status: "completed",
  },
  {
    id: 8,
    customerId: "98c7161f-d85e-4fdd-a737-8774aab5901e",
    items: [{ id: 2, name: "item 1" }],
    status: "processing",
  },
  {
    id: 9,
    customerId: "e104987e-807a-4968-b66b-7522f7205f52",
    items: [{ id: 3, name: "item 1" }],
    status: "processing",
  },
  {
    id: 10,
    customerId: "cad0c2bc-16b0-469b-ad0b-e12de19c0d10",
    items: [{ id: 4, name: "item 1" }],
    status: "processing",
  },
  {
    id: 11,
    customerId: "98c7161f-d85e-4fdd-a737-8774aab5901e",
    items: [{ id: 4, name: "item 1" }],
    status: "processing",
  },
  {
    id: 12,
    customerId: "2e485f2c-0cf4-49fa-beea-1ce015924293",
    items: [{ id: 6, name: "item 1" }],
    status: "processing",
  },
  {
    id: 13,
    customerId: "2e485f2c-0cf4-49fa-beea-1ce015924293",
    items: [{ id: 6, name: "item 1" }],
    status: "processing",
  },
  {
    id: 14,
    customerId: "2e485f2c-0cf4-49fa-beea-1ce015924293",
    items: [{ id: 3, name: "item 1" }],
    status: "processing",
  },
];

export const getAllOrders = (take: number, skip: number) => {
  if (skip === 0) {
    return orders.slice(0, take);
  }
  if (skip > 0) {
    return orders.slice(skip).slice(0, take);
  }
};

export const getSingleOrder = (id: number) => {
  return orders.find((itm) => itm.id === id) ?? null;
};

export const getOrdersByCustomer = (customerId: string) => {
  return orders.filter((w) => w.customerId === customerId);
};

export const addItemsToOrder = (id: number, payload: Order["items"]) => {
  const findOrderIndex = orders.findIndex((order) => order.id === id);
  const orderData = orders[findOrderIndex];
  if (!orderData) return null;

  orderData.items = [...orderData.items, ...payload];

  orders[findOrderIndex] = orderData;

  return orderData;
};

export const updateOrder = (id: number, payload: Partial<Order>) => {
  const itemIndex = orders.findIndex((i) => i.id === id);

  if (itemIndex === -1) return null;

  const data = { ...orders[itemIndex], ...payload };

  orders[itemIndex] = data;

  return data;
};

export const deleteItemFromOrder = (orderId: number, itemId: number) => {
  const findOrderIndex = orders.findIndex((order) => order.id === orderId);
  const orderData = orders[findOrderIndex];
  if (!orderData) return null;

  orderData.items = orderData.items.filter((itm) => itm.id !== itemId);

  orders[findOrderIndex] = orderData;

  return orderData;
};
