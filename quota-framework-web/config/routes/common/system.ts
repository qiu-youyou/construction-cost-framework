/*
 * @Author: SHUANG
 * @Date: 2022-07-18 10:53:18
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-08 14:35:51
 * @Description: 系统管理
 */

module.exports = [
  {
    name: '系统管理',
    path: 'system',
    icon: 'SettingOutlined',
    routes: [
      {
        path: 'menu',
        name: '菜单管理',
        component: '@/common/views/system/Menu',
        access: 'accessRoute',
      },
      {
        path: 'role',
        name: '角色管理',
        component: '@/common/views/system/Role',
        access: 'accessRoute',
      },
      {
        path: 'user',
        name: '用户管理',
        component: '@/common/views/system/User',
        access: 'accessRoute',
      },
      {
        path: 'organ',
        name: '组织机构',
        component: '@/common/views/system/Organ',
        access: 'accessRoute',
      },
      {
        path: 'region',
        name: '区域管理',
        component: '@/common/views/system/Region',
        access: 'accessRoute',
      },
      {
        path: 'dict',
        name: '字典管理',
        component: '@/common/views/system/Dict',
        access: 'accessRoute',
      },
      {
        path: 'tree/dict',
        name: '树形字典',
        component: '@/common/views/system/DictTree',
        access: 'accessRoute',
      },
      {
        name: '业务字典',
        path: 'business_dict',
        component: '@/common/views/system/BizDict',
        access: 'accessRoute',
      },
      {
        path: 'work',
        name: '反馈工单',
        access: 'accessRoute',
        component: '@/common/views/system/Work',
      },
    ],
  },
];
