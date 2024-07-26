import dotenv from "dotenv";
import pg from "pg";
const { Pool } = pg;

dotenv.config();
const env = process.env;


export const pool = new Pool({
  host:  env.DB_HOST,
  port: parseInt(process.env.DB_PORT!, 10),
  user: env.DB_USER,
  password: env.DB_PASSWORD,
  database:  env.DB_NAME,
});

export const initializeDatabase = async () => {
  try {
    await pool.connect(); // Attempt to connect to the database
    console.log('Database connection successful');

    await pool.query(`
      CREATE TABLE IF NOT EXISTS dummy (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) UNIQUE NOT NULL,
          price INT 
      );

    `);
    console.log('Tables initialized successfully');
  } catch (err) {
    console.error('Failed to connect to the database:', err);
    process.exit(1); // Exit the application if connection fails
  }
}
