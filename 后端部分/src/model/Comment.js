/*
  Comment Model
*/

const mongoose = require('../db/db')

// 定义 Schema
const CommentSchema = mongoose.Schema({
  content: {
    type: String,
    require: true
  },
  username: String
}, { timestamps: true })

// 生成 model
const Comment = mongoose.model('comment', CommentSchema)

module.exports = Comment