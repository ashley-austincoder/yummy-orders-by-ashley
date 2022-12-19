import mysql from 'mysql';

const dbPool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "2dL3zYg9!X8E",
  database: 'Yumi'
});

dbPool.getConnection((err, connection) => {
  if (err) throw err;
  console.log("Database connected!");
  connection.release();
});

export default dbPool;