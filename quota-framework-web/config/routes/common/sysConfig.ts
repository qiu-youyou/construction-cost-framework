/*
 * @Author: SHUANG
 * @Date: 2023-07-25 11:35:44
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-12-27 14:34:17
 * @Description: 系统配置
 */
module.exports = [
  {
    name: '系统配置',
    path: 'sysconfig',
    icon: 'ToolOutlined',
    routes: [
      {
        name: '平台配置',
        path: 'platform',
        access: 'accessRoute',
        component: '@/common/views/sysConfig/Platform',
      },
      {
        path: 'holiday',
        name: '节假日管理',
        access: 'accessRoute',
        component: '@/common/views/sysConfig/Holiday',
      },
      {
        path: 'static',
        name: '静态资源管理',
        access: 'accessRoute',
        component: '@/common/views/sysConfig/Static',
      },
      {
        path: 'link',
        name: '友情连接管理',
        access: 'accessRoute',
        component: '@/common/views/sysConfig/Link',
      },
      {
        path: 'shortcut',
        name: '系统快捷方式',
        access: 'accessRoute',
        component: '@/common/views/sysConfig/Shortcut',
      },
      {
        path: 'field',
        name: '查询与排序管理',
        access: 'accessRoute',
        component: '@/common/views/sysConfig/Field',
      },
    ],
  },
];
