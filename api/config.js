const mysql = require('mysql2')
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'tangjiefeng',
  database: 'heart_consult'
})
module.exports = db
