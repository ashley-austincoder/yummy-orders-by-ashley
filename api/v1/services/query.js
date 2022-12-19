import dbConnection from "./db.js";

const runSqlQuery = async (sql) => {
  return new Promise((resolve, reject) => {
    dbConnection.query(sql, (error, result) => {
      if (error) {
        reject(error);
      } else {
        console.log('result', result);
        resolve(result);
      }
    });
  });
};

export default runSqlQuery;
