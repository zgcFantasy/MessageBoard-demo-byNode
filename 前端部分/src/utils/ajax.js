/**
 * @description ajax 工具封装
 * 
 */

import axios from 'axios'

// 跨域带 cookie
axios.defaults.withCredentials = true

// 统一处理 res
function resHandler (res = {}) {
  const resData = res.data || {}
  if (resData.errno === 0) {
    return resData.data || {}
  }

  // 统一弹出错误
  if (!resData.hideMessage) {
    alert(resData.message)
  }
  throw Error(`错误码： ${resData.errno} \n错误信息：${resData.message}`)
}

/**
 * 发送 get 请求
 * @param {String} url url
 * @param {Object} params url 参数
 */
async function ajaxGet (url = '', params = {}) {
  if (!url) return

  try {
    const res = await axios.get(url, params)
    return resHandler(res)
  } catch (ex) {
    throw Error(ex)
  }
}

/**
 * 发送 post 请求
 * @param {String} url url
 * @param {Object} data post body
 */
async function ajaxPost (url = '', data = {}) {
  if (!url) return

  try {
    const res = await axios.post(url, data)
    return resHandler(res)
  } catch (ex) {
    throw Error(ex)
  }
}

export {
  ajaxGet,
  ajaxPost
}
