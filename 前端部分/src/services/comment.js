/**
 * @description 留言 services
 * 
 */

import { ajaxPost, ajaxGet } from '../utils/ajax'
import {
  CREATE_COMMENT_URL,
  COMMENT_LIST_URL,
  COMMENT_DEL_URL,
  COMMENT_UPDATE_URL
} from '../conf/apis'

/**
 * 创建留言
 * @param {String} content 留言内容
 */
async function createCommentService (content = '') {
  const res = await ajaxPost(CREATE_COMMENT_URL, {
    content
  })
  return res
}

/**
 * 获取留言列表
 * @param {Number} filterType 1 - 看全部；2 - 只看自己
 */
async function getCommentListService (filterType = 1) {
  const url = `${COMMENT_LIST_URL}?filterType=${filterType}`
  const res = await ajaxGet(url)
  return res
}

/**
 * 删除留言
 * @param {String} _id id
 */
async function delCommentService (_id) {
  const res = await ajaxPost(COMMENT_DEL_URL, { _id })
  return res
}

/**
 * 更新留言
 * @param {String} _id id
 * @param {String} content 内容
 */
async function updateCommentService (_id, content) {
  const res = await ajaxPost(COMMENT_UPDATE_URL, { _id, content })
  return res
}

export {
  createCommentService,
  getCommentListService,
  delCommentService,
  updateCommentService
}
