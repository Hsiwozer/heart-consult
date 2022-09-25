const express = require('express')
const router = express.Router()
const db = require('./config')

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

router.get('/knowledge_list/get', (req, res) => {
  // const sqlStr = `select * from knowledge_list limit 0, ${req.query.pagesize}`
  const sqlStr = `select * from knowledge_list order by rand() limit ${req.query.pagesize}`
  // console.log(req.query);
  db.query(sqlStr, (err, results) => {
    if(err) return console.log(err.message);
    res.send({
      status: 0,  // 0成功，1失败
      msg: 'GET 请求成功！',
      data: {
        'total': results.length,
        'pagenum': 1,
        'message': results
      }
    })
  })
})

module.exports = router