const sql = require('mssql');
require('dotenv').config();

const config = {
  user: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
  server: process.env.SQL_SERVER,
  database: process.env.SQL_DATABASE,
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

module.exports = {
  sql,
  poolPromise: new sql.ConnectionPool(config)
    .connect()
    .then(pool => {
      console.log('Connected to SQL Server');
      return pool;
    })
    .catch(err => console.log('DB Connection Failed', err)),
};
