const express = require('express')
const app = express()
const bodyParser = require('body-parser')

// 配置解析表单数据的中间件
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: false }))

// app.use((err, req, res next) => {
//   if(err.name === 'UnauthorizedError') {
//     return res.send({ status: 401, message: '无效的token' })
//   }
//   res.send({ status: 500, message: '未知错误' })
// })

const router = require('./apiRouter')
app.use('/api' ,router)

app.listen(8080, () => {
  console.log('Server runing at http://localhost:8080');
})