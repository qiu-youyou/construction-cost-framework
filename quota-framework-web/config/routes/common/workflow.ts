/*
 * @Author: SHUANG
 * @Date: 2022-09-01 15:18:50
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-12-26 18:35:21
 * @Description: 流程管理
 */

module.exports = [
  {
    name: '流程管理',
    path: 'workflow',
    icon: 'ClusterOutlined',
    routes: [
      {
        path: 'model',
        name: '模型管理',
        component: '@/common/views/workflow/Model',
        access: 'accessRoute',
      },
      {
        path: 'instance',
        name: '流程实例管理',
        component: '@/common/views/workflow/Instance',
        access: 'accessRoute',
      },
    ],
  },
];
