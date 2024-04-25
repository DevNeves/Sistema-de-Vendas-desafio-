const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'vitor123',
  database: 'sistema_vendas',
});

module.exports = connection;
