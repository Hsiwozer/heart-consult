const express = require('express')
const router = express.Router()
const db = require('./db')

router.get('/video_list/get', (req, res) => {
  const sqlStr = 'select * from video_list'
  db.query(sqlStr, (err, results) => {
    if(err) return console.log(err.message);
    res.send({
      status: 0,  // 0成功，1失败
      msg: 'GET 请求成功！',
      data: results
    })
  })
})

module.exports = router