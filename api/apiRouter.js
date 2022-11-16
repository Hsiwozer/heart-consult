const express = require('express')
const router = express.Router()
const db = require('./config')

const jwt = require('jsonwebtoken')
const expressJWT = require('express-jwt')

// 获取视频列表的 API
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

// 获取知识列表的 API
router.get('/knowledge_list/get', (req, res) => {
  const sqlStr = `select * from knowledge_list order by rand() limit ${req.query.pagesize}`
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

// 获取知识详情的 API
router.get('/knowledge_detail/get', (req, res) => {
  // const sqlStr = `select * from knowledge_list where id=${req.query.id}`
  const sqlStr = 'select * from knowledge_list where id=?'
  db.query(sqlStr, req.query.id, (err, results) => {
    if(err) return console.log(err.message);
    res.send({
      status: 0,
      msg: 'GET 请求成功！',
      data: results
    })
  })
})

// 获取量表数据的API
router.get('/scales/get', (req, res) => {
  const sqlStr = 'select * from scales'
  db.query(sqlStr, (err, results) => {
    if(err) return console.log(err.message);
    res.send({
      status: 0,  // 0成功，1失败
      msg: 'GET 请求成功！',
      data: results
    })
  })
})

// 修改点赞收藏数的API
// router.post('/interaction_num/change', (req, res) => {
//   const sqlStr = 'select * from knowledge_list where id=?'
// })

// 获取用户点赞行为的 API
router.post('/interaction', (req, res) => {
  const sqlStr = 'update knowledge_list set liked=? where id=?'
  let like = (req.query.liked - 1) * (req.query.liked - 1)
  // console.log(req.query.liked);
  // console.log(like);
  const query = [like, req.query.id]
  db.query(sqlStr, query, (err, results) => {
    if(err) return console.log(err.message);
    res.send({
      status: 0,
      msg: 'GET 请求成功！',
      data: results
    })
  })
})

// 获取登录 token 的 API
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