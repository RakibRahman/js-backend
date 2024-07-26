import dotenv from "dotenv";
import pg from "pg";
const { Pool } = pg;

dotenv.config();
const env = process.env;


export const pool = new Pool({
  host: "localhost",
  port: parseInt(process.env.DB_PORT!, 10),
  user: env.DB_USER,
  password: env.DB_PASSWORD,
  database: "martdb",
});

