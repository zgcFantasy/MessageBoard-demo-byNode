// user controller
const User = require('../model/User')

// 注册操作
async function register (userInfo = {}) {
  const newUser = await User.create(userInfo)
  return newUser
}

// 登录
async function login (username, password) {
  const user = await User.findOne({ username, password })
  if (user != null) {
    // 登录成功
    return true
  }
  return false
}
module.exports = {
  register,
  login
}