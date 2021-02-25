// 留言 controller

const Comment = require('../model/Comment')

// 更新留言
async function update (_id, username, content) {
  const res = await Comment.findOneAndUpdate(
    { _id, username },
    { content },
    { new: true })//返回更新后的结果
  return res
}

// 删除留言
async function del (_id, username) {
  const res = await Comment.deleteOne({
    _id, username
  })
}

// 获取留言列表
async function getList (username = '') {
  // 查询条件
  const whereOpt = {}
  if (username) {
    whereOpt.username = username
  }
  const list = await Comment.find(whereOpt).sort({ _id: -1 })
  return list
}

// 创建留言
async function create (content, username) {
  const newComment = await Comment.create({
    content,
    username
  })

  return newComment
}

module.exports = {
  create,
  getList,
  del,
  update
}