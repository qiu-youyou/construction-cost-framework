/*
 * @Author: SHUANG
 * @Date: 2023-06-16 14:28:14
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-10-07 16:10:54
 * @Description: 用户相关
 */

module.exports = {
  /** 登录 */
  'POST /api/login': async (req, res) => {
    const result = {
      message: '登录成功!',
      rows: 'jonda_token_62b416dfdf6110c22534223fc2a2d4wseb264a',
      status: 'SUCCESS',
    };
    res.send(result);
  },

  /** 获取用户信息 */
  'POST /api/security/getUserInfo/*': async (req, res) => {
    const result = {
      status: 'SUCCESS',
      message: '获得用户成功',
      rows: {
        userName: 'ADMIN',
        fullName: '超级管理员',
        generalfactory: [],
        branchfactory: [],
        constructUnitInfo: [],
        camps: [],
      },
    };
    res.send(result);
  },

  /** 获取配置信息 */
  'POST /api/security/loadConfig': async (req, res) => {
    const result = {
      message: '成功',
      status: 'SUCCESS',
      rows: {},
    };
    res.send(result);
  },

  /** 退出登录 */
  'POST /api/logout': { rows: {}, status: 'SUCCESS' },

  /** 修改密码 */
  'POST /sys/user/updatePwd.action': { rows: {}, status: 'SUCCESS' },
};
