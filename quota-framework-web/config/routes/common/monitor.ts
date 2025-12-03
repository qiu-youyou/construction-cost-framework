/*
 * @Author: SHUANG
 * @Date: 2023-07-25 11:35:44
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-12-27 14:34:11
 * @Description: 系统监控
 */
module.exports = [
  {
    name: '系统监控',
    path: 'monitor',
    icon: 'ControlOutlined',
    routes: [
      {
        path: 'oplog',
        name: '操作日志',
        component: '@/common/views/monitor/OpLog',
        access: 'accessRoute',
      },
      {
        name: '接口日志',
        path: 'aplog',
        component: '@/common/views/monitor/ApLog',
        access: 'accessRoute',
      },
    ],
  },
];
