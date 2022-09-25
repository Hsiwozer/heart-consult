const express = require('express')
const app = express()

// 配置解析表单数据的中间件
// app.use(express.urlencoded({ extended: false }))

const router = require('./apiRouter')
app.use('/api' ,router)

app.listen(8080, () => {
  console.log('Server runing at http://localhost:8080');
})