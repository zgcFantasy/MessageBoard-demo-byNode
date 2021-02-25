/*
  User Model
*/

const mongoose = require('../db/db')

// 定义数据 Schema
const UserSchema = mongoose.Schema({
  username: {
    type: String,
    require: true,
    unique: true
  },
  password: String,
  age: Number,
  city: String,
  gender: {
    type: Number,
    default: 0 // 0 保密，1 男，2 女
  }
}, { timestamps: true })

// 生成模型
const User = mongoose.model('user', UserSchema)

module.exports = User