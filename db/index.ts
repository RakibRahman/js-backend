import dotenv from "dotenv";
import pg from "pg";
const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);
const { Pool } = pg;

dotenv.config();
const env = process.env;

export const pool = new Pool({
  host: env.DB_HOST,
  port: parseInt(process.env.DB_PORT!, 10),
  user: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
});

export const PostgresStore = new pgSession( {
  pool: pool,
  tableName: "users_sessions",
});

export const initializeDatabase = async () => {
  try {
    await pool.connect(); // Attempt to connect to the database
    console.log("Database connection successful");

    await pool.query(`
      CREATE TABLE IF NOT EXISTS items (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) UNIQUE NOT NULL,
          price INT,
          category VARCHAR(255) DEFAULT NULL 
      );

    CREATE TABLE IF NOT EXISTS users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    image_url TEXT,
    role TEXT
);

CREATE TABLE IF NOT EXISTS users_sessions (
  sid VARCHAR(255) NOT NULL,
  sess TEXT NOT NULL,
  expire TIMESTAMP NOT NULL,
  PRIMARY KEY (sid)
);

    `);
    console.log("Tables initialized successfully");
  } catch (err) {
    console.error("Failed to connect to the database:", err);
    process.exit(1); // Exit the application if connection fails
  }
};

export const query = (text: string, params?: any[]) => pool.query(text, params);
