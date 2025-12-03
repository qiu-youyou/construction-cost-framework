/*
 * @Author: SHUANG
 * @Date: 2023-06-19 17:47:40
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-11-23 10:13:24
 * @Description: 首页
 */
module.exports = [
  {
    name: '首页',
    path: '/home',
    component: '@/common/views/home',
    icon: 'HomeOutlined',
  },
  {
    name: '首页',
    hideInMenu: true,
    path: '/home/:businessKey/:businessId',
    component: '@/common/views/home',
  },
  {
    name: '首页',
    hideInMenu: true,
    path: '/home/:businessKey/:businessId/:notice/:noticeId',
    component: '@/common/views/home',
  },
];
