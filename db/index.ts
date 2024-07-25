import pg from "pg";
const { Pool } = pg;

const env = process.env;


export const pool = new Pool({
  host: "db",
  port: parseInt(process.env.PORT!, 10),
  user: env.DB_USER,
  password: env.DB_PASSWORD,
  database: "martdb",
});

