import pg from 'pg';
import 'dotenv/config';

const { Pool, types } = pg;

// Tipe DATE dibaca sebagai string 'YYYY-MM-DD', bukan objek Date
types.setTypeParser(1082, (value) => value);

export const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  max: 10,
});