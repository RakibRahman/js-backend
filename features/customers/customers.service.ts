import { randomUUID } from "crypto";
import { getOrdersByCustomer } from "../orders/orders.service";
import { Customer } from "../types";

const customers: Customer[] = [
  {
    id: "98c7161f-d85e-4fdd-a737-8774aab5901e",
    name: "rakib",
    age: 27,
  },
  {
    id: "e104987e-807a-4968-b66b-7522f7205f52",
    name: "labib",
    age: 15,
  },
  {
    id: "2e485f2c-0cf4-49fa-beea-1ce015924293",
    name: "umar",
    age: 3,
  },
  {
    id: "65c99e18-5c14-4eab-beed-b3101306740d",
    name: "sadika",
    age: 14,
  },
  {
    id: "cad0c2bc-16b0-469b-ad0b-e12de19c0d10",
    name: "rakin",
    age: 6,
  },
];

export const getAllCustomers = () => {
  return customers;
};

export const getSingleCustomer = (id: string) => {
  return customers.find((itm) => itm.id === id) ?? null;
};

export const deleteDelete = (id: string) => {
  const isValidCustomer = customers.find((it) => it.id === id);

  return isValidCustomer ? customers.filter((item) => item.id !== id) : null;
};

export const addCustomer = (name: string, age: number) => {
  customers.push({ id: randomUUID(), name, age });
  return customers;
};

export const updateCustomer = (
  id: string,
  payload: Partial<Omit<Customer, "id">>
) => {
  const itemIndex = customers.findIndex((i) => i.id === id);

  const data = { ...customers[itemIndex], ...payload };

  return [
    ...customers.slice(0, itemIndex),
    data,
    ...customers.slice(itemIndex + 1),
  ];
};

export const getCustomerOrders = (id: string) => {
  const isValidCustomer = customers.find((it) => it.id === id);
  return isValidCustomer ? getOrdersByCustomer(id) : [];
};

export const searchCustomers = (query: string) => {
  const queryKey = query.trim().slice(6).toLowerCase(); //get all string after query=
  return customers.filter((ctm) => {
    if (ctm.name.includes(queryKey)) {
      return ctm;
    }
  });
};
