const express = require('express')
const router = express.Router()
const db = require('./config')

const jwt = require('jsonwebtoken')
const expressJWT = require('express-jwt')

// 获取视频列表的 API
router.get('/video_list/get', (req, res) => {
  const sqlStr = 'select * from video_list'
  db.query(sqlStr, (err, results) => {
    if (err) return console.log(err.message);
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
    if (err) return console.log(err.message);
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
  const sqlStr = 'select * from knowledge_list where id=?'
  db.query(sqlStr, req.query.id, (err, results) => {
    if (err) return console.log(err.message);
    res.send({
      status: 0,
      msg: 'GET 请求成功！',
      data: results
    })
  })
})

// 获取量表数据的API
// router.get('/scales/get', (req, res) => {
//   const sqlStr = 'select * from scales'
//   db.query(sqlStr, (err, results) => {
//     if (err) return console.log(err.message);
//     res.send({
//       status: 0,  // 0成功，1失败
//       msg: 'GET 请求成功！',
//       data: results
//     })
//   })
// })

// 修改用户点赞行为的 API
router.post('/interaction/like', (req, res) => {
  const sqlStr = 'update knowledge_list set liked=?, footTime=? where id=?'
  let like = (req.query.liked - 1) * (req.query.liked - 1)
  const query = [like, req.query.footTime, req.query.id]
  db.query(sqlStr, query, (err, results) => {
    if (err) return console.log(err.message);
    res.send({
      status: 0,
      msg: 'POST 请求成功！',
      data: results
    })
  })
})

// 修改用户收藏行为的 API
router.post('/interaction/collect', (req, res) => {
  const sqlStr = 'update knowledge_list set collected=?, footTime=? where id=?'
  let collect = (req.query.collected - 1) * (req.query.collected - 1)
  const query = [collect, req.query.footTime, req.query.id]
  db.query(sqlStr, query, (err, results) => {
    if (err) return console.log(err.message);
    res.send({
      status: 0,
      msg: 'POST 请求成功！',
      data: results
    })
  })
})

// 修改用户足迹行为（即是否浏览过该文章）的 API
router.post('/interaction/foot', (req, res) => {
  const sqlStr = 'update knowledge_list set footed=1, footTime=? where id=?'
  const query = [req.query.footTime, req.query.id]
  db.query(sqlStr, query, (err, results) => {
    if (err) return console.log(err.message);
    res.send({
      status: 0,
      msg: 'POST 请求成功！',
      data: results
    })
  })
})

// 获取登录 token 的 API
router.post('/users/wxlogin', (req, res) => {
  const userinfo = req.body
  if (!userinfo.code) return res.send({ status: 1, msg: '请求失败！' })
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
    token: 'Bearer ' + tokenStr
  })
})

// 将用户信息登录登出信息写入数据库的 API
router.post('/userinfo', (req, res) => {
  const sqlStr = 'insert into userInfo (nickName, language, gender, status, time) values (?,?,?,?,?)'
  const body = req.body
  const query = [body.nickName, body.language, body.gender, body.status, body.time]
  db.query(sqlStr, query, (err, results) => {
    if (err) return console.log(err.message);
    res.send({
      status: 0,
      msg: 'POST 请求成功！',
      data: results
    })
  })
})

// 获取用户点赞文章列表
router.get('/like/get', (req, res) => {
  const sqlStr = 'select * from knowledge_list where liked=1 order by footTime DESC'
  db.query(sqlStr, (err, results) => {
    if (err) return console.log(err.message);
    res.send({
      status: 0,  // 0成功，1失败
      msg: 'GET 请求成功！',
      data: results
    })
  })
})

// 获取用户收藏文章列表
router.get('/collect/get', (req, res) => {
  const sqlStr = 'select * from knowledge_list where collected=1 order by footTime DESC'
  db.query(sqlStr, (err, results) => {
    if (err) return console.log(err.message);
    res.send({
      status: 0,  // 0成功，1失败
      msg: 'GET 请求成功！',
      data: results
    })
  })
})

// 获取用户浏览过（足迹）文章列表
router.get('/foot/get', (req, res) => {
  const sqlStr = 'select * from knowledge_list where footed=1 order by footTime DESC'
  db.query(sqlStr, (err, results) => {
    if (err) return console.log(err.message);
    res.send({
      status: 0,  // 0成功，1失败
      msg: 'GET 请求成功！',
      data: results
    })
  })
})

// 清空浏览记录（足迹）
router.get('/foot/clear', (req, res) => {
  const sqlStr = 'update knowledge_list set footed=0'
  db.query(sqlStr, (err, results) => {
    if (err) return console.log(err.message);
    res.send({
      status: 0,  // 0成功，1失败
      msg: 'GET 请求成功！'
    })
  })
})

// 获取证型证候的 API
router.get('/syndrome/get', (req, res) => {
  const sqlStr = 'select * from syndromes'
  db.query(sqlStr, (err, results) => {
    if (err) return console.log(err.message);
    res.send({
      status: 0,  // 0成功，1失败
      msg: 'GET 请求成功！',
      data: results
    })
  })
})

// 获取诊疗方法的 API
router.get('/treatment/get', (req, res) => {
  const sqlStr = 'select * from treatment where disease=?'
  db.query(sqlStr, req.query.disease, (err, results) => {
    if (err) return console.log(err.message);
    res.send({
      status: 0,  // 0成功，1失败
      msg: 'GET 请求成功！',
      data: results
    })
  })
})

// 将问诊记录写入数据库的 API
router.post('/record', (req, res) => {
  const sqlStr = 'insert into consult_record (disease, clinical, therapy, prescription, medicine, time) values (?,?,?,?,?,?)'
  const body = req.body
  const query = [body.disease, body.clinical, body.therapy, body.prescription, body.medicine, body.time]
  db.query(sqlStr, query, (err, results) => {
    if (err) return console.log(err.message);
    res.send({
      status: 0,
      msg: 'POST 请求成功！',
      data: results
    })
  })
})

// 获取数据库中的问诊记录的 API
router.get('/record_detail/get', (req, res) => {
  const sqlStr = 'select * from consult_record where id = ?'
  db.query(sqlStr, req.query.id, (err, results) => {
    if (err) return console.log(err.message);
    res.send({
      status: 0,  // 0成功，1失败
      msg: 'GET 请求成功！',
      data: results
    })
  })
})

// 获取详细的问诊记录的 API
router.get('/recordlist/get', (req, res) => {
  const sqlStr = 'select * from consult_record order by time DESC'
  db.query(sqlStr, (err, results) => {
    if (err) return console.log(err.message);
    res.send({
      status: 0,  // 0成功，1失败
      msg: 'GET 请求成功！',
      data: results
    })
  })
})

module.exports = router