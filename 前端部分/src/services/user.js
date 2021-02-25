/**
 * @description 用户 services
 * 
 */

import { ajaxGet, ajaxPost } from '../utils/ajax'
import { REGISTER_URL, LOGIN_URL, GET_USER_INFO_URL } from '../conf/apis'

/**
 * 注册新用户
 * @param {Object} userInfo 用户信息
 */
async function registerService (userInfo = {}) {
  await ajaxPost(REGISTER_URL, userInfo)
}

/**
 * 登录
 * @param {String} username 用户名
 * @param {String} password 密码
 */
async function loginService (username, password) {
  await ajaxPost(LOGIN_URL, {
    username,
    password
  })
}

/**
 * 获取用户信息
 */
async function getUserInfoService () {
  const userinfo = await ajaxGet(GET_USER_INFO_URL)
  return userinfo
}

export {
  registerService,
  loginService,
  getUserInfoService
}
