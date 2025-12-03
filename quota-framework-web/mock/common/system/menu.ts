/*
 * @Author: SHUANG
 * @Date: 2023-07-17 09:55:15
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-10-07 15:33:15
 * @Description:
 */

module.exports = {
  /** 查询菜单 */
  'POST /api/sys/menu/queryTreeNodeAll.action': {
    status: 'SUCCESS',
    message: '操作成功',
    rows: [],
  },

  /** 查询菜单按钮 */
  'POST /api/sys/menu/btn/queryPageInfo.action': {
    rows: [],
    status: 'SUCCESS',
  },
};
