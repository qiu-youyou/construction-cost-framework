/*
 * @Author: SHUANG
 * @Date: 2023-07-12 14:00:55
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-12-27 14:42:30
 * @Description: 通知公告
 */

module.exports = [
  {
    name: '通知公告',
    path: 'message',
    icon: 'BellOutlined',
    routes: [
      {
        path: 'notice',
        name: '通知管理',
        component: '@/common/views/message/Notice',
        access: 'accessRoute',
      },
      {
        path: 'public',
        name: '公告管理',
        component: '@/common/views/message/Bulletin',
        access: 'accessRoute',
      },
    ],
  },
];
