/*
 * @Author: SHUANG
 * @Date: 2023-07-25 11:33:47
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-18 15:25:34
 * @Description: common
 */
const monitor = require('jd-framework-web/package/config/routes/common/monitor');
const workflow = require('jd-framework-web/package/config/routes/common/workflow');
const config = require('jd-framework-web/package/config/routes/common/sysConfig');
const system = require('jd-framework-web/package/config/routes/common/system');
const outWindow = require('jd-framework-web/package/config/routes/common/OutWindow');

export default [
  {
    path: 'manage',
    icon: 'SettingOutlined',
    routes: [
      ...config,
      ...system,
      ...monitor,
      ...workflow,
      {
        name: '定额维护权限',
        path: 'dbaccess',
        icon: 'DatabaseOutlined',
        component: '@/pages/database/DbAccess',
        access: 'accessRoute',
      },
      {
        name: '同步接口数据',
        path: 'dataswap',
        icon: 'DatabaseOutlined',
        component: '@/pages/dataswap/DataswapMain',
        access: 'accessRoute',
      },
    ],
  },

  {
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

  ...outWindow,
];
