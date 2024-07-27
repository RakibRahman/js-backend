export type Item = {
  id: number;
  name: string;
  price: number;
  category:string
};

export type Customer = {
  id: string;
  name: string;
  age: number;
};

export type OrderStatus = "completed" | "canceled" | "processing";

export type Order = {
  id: number;
  customerId: string;
  status: OrderStatus;
  items: { name: string; id: number }[];
};
