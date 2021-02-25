/**
 * @description 日期 工具函数
 * 
 */

import { format } from 'date-fns'

/**
 * 日期格式化
 * @param {Date} dt 日期
 * @param {String} formatTpl 格式，如 yyyy-MM-dd
 */
function formatDt (dt, formatTpl = 'yyyy-MM-dd HH:mm') {
  if (dt instanceof Date === false) {
    dt = new Date(dt)
  }
  return format(dt, formatTpl)
}

export {
  formatDt
}
