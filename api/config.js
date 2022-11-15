// const mysql = require('mysql2')
// const db = mysql.createPool({
//   host: '106.14.239.182',
//   user: 'heart_consult',
//   password: 'tangjiefeng',
//   database: 'heart_consult'
// })
// module.exports = db

const mysql = require('mysql2')
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'tangjiefeng',
  database: 'heart_consult'
})
module.exports = db
