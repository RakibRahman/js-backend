import { pool, query } from "../../db";
import { Tables } from "../../db/table";
import { Item } from "../types";


export const getAllItems = async () => {
  const items = await query(`SELECT * FROM ${Tables.ITEMS}`);
  return items.rows;
};

export const getSingleItem = async (id: number) => {
  return (
    (await query(`SELECT * FROM ${Tables.ITEMS} WHERE id = $1`, [id]))
      .rows[0] ?? null
  );
};

export const deleteItem = async (id: number) => {
  const sql = `
  DELETE FROM ${Tables.ITEMS}
  WHERE id = $1
  RETURNING *;
              `;
  const item = await query(sql, [id]);

  return item ? item.rows[0] : null;
};

export const addItem = async (name: string, price: number) => {
  const sql = `INSERT INTO ${Tables.ITEMS} (name,price) VALUES($1,$2) RETURNING *;`;
  const item = await pool.query(sql, [name, price]);
  return item.rows.length ? item.rows[0] : null;
};

export const updateItem = async (id: number, payload: Partial<Item>) => {
  const data = Object.values(payload);

  const columnsToUpdate = Object.keys(payload).map(
    (col, i) => `${col}=$${i + 1}`
  );

  const sql = `UPDATE ${
    Tables.ITEMS
  } SET ${columnsToUpdate.toString()} WHERE id=$${
    columnsToUpdate.length + 1
  } RETURNING *;`;

  const item = await pool.query(sql, [...data, id]);

  return item.rows.length ? item.rows[0] : null;
};
