/*
 * @Author: SHUANG
 * @Date: 2022-07-18 10:53:18
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-10-07 15:55:01
 * @Description: 用户
 */
module.exports = [
  {
    path: '/user',
    routes: [
      {
        name: '登录',
        path: 'login',
        layout: false,
        component: '@/common/views/user/Login',
      },
      {
        name: '修改密码',
        path: 'changeForce',
        layout: false,
        component: '@/common/views/user/ChangePassword',
      },
      {
        name: '修改密码',
        path: 'changePass',
        component: '@/common/views/user/ChangePassword',
      },
    ],
  },
];
