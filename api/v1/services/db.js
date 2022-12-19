import mysql from 'mysql';
const dbPool = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.DB_PW,
  database: process.env.DB
});

dbPool.getConnection((err, connection) => {
  if (err) throw err;
  console.log('Database connected!');
  connection.release();
});

export default dbPool;
