import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

pool.getConnection()
  .then(async (conn) => {
    const [rows] = await conn.query('SELECT NOW()');
    console.log(`✅ Connected to MySQL database "${process.env.DB_NAME}" at ${rows[0]['NOW()']}`);
    conn.release();
  })
  .catch((err) => {
    console.error('❌ Error connecting to database:', err.message);
  });

export default pool;