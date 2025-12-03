/*
 * @Author: SHUANG
 * @Date: 2023-06-16 14:28:14
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-10-07 16:10:11
 * @Description:
 */

module.exports = {
  /** 查询菜单 */
  'POST /api/sys/menu/queryUserRote.action': async (req, res) => {
    const localRoutes = [];
    const result = {
      status: 'SUCCESS',
      rows: [{ icon: 'smile', path: '/home', name: 'home', meta: { title: '首页' } }, ...localRoutes],
      message: '操作成功',
    };
    res.send(result);
  },
};
