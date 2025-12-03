/*
 * @Author: SHUANG
 * @Date: 2023-06-16 14:28:14
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-10-07 15:33:34
 * @Description: 系统相关
 */

module.exports = {
  /** 用户配置表保存 */
  'POST /api/sys/column/config/save.action': { rows: {}, status: 'SUCCESS' },

  /** 用户配置表读取 */
  'POST /api/sys/column/config/queryOne.action': {
    rows: {},
    status: 'SUCCESS',
  },
};
