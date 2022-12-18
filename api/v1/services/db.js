var mysql = require('mysql');

var dbConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "2dL3zYg9!X8E",
  database: 'Yumi'
});

dbConnection.connect(function(err) {
  if (err) throw err;
  console.log("Database connected!");
});

// dbConnection.end((err) => {
//   // The connection is terminated gracefully
//   // Ensures all remaining queries are executed
//   // Then sends a quit packet to the MySQL server.
// });
module.exports = dbConnection;