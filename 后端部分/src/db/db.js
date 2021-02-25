/*
  连接 mongodb 数据库，并进行初始配置
*/

const mongoose = require('mongoose')

const url = 'mongodb://localhost:27017'
const dbName = 'commentDB'

// mongoose.set('useCreateIndex', true)
// mongoose.set('useFindAndModify', false)

// 连接 mongodb 并进入指定 database
mongoose.connect(url + '/' + dbName, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
})

// 获取连接对象，添加一个错误处理函数
const conn = mongoose.connection
conn.on('error', err => {
  console.error("connection error:", err)
})

module.exports = mongoose