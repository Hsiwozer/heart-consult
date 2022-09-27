const express = require('express')
const router = express.Router()
const db = require('./config')

const jwt = require('jsonwebtoken')
const expressJWT = require('express-jwt')

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

router.get('/knowledge_detail/get', (req, res) => {
  const sqlStr = `select * from knowledge_list where id=${req.query.id}`
  db.query(sqlStr, (err, results) => {
    if(err) return console.log(err.message);
    res.send({
      status: 0,
      msg: 'GET 请求成功！',
      data: results
    })
  })
})

router.post('/users/wxlogin', (req, res) => {
  const userinfo = req.body
  if(!userinfo.code) return res.send({ status: 1, msg: '请求失败！' })
  const secretKey = userinfo.code
  // app.use(expressJWT({ secret: secretKey, algorithms: ['HS256'] }).unless({ path: [/^\/api\//] }) )
  const info = {
    encryptedData: userinfo.encryptedData,
    rawData: userinfo.rawData,
    iv: userinfo.iv,
    signature: userinfo.signature
  }
  const tokenStr = jwt.sign(info, secretKey, { expiresIn: '24h' })
  res.send({
    status: 0,
    msg: 'POST 请求成功！',
    token: tokenStr
  })
})

module.exports = router