/*
 * @Author: SHUANG
 * @Date: 2023-06-19 17:47:40
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-12-26 18:35:40
 * @Description:
 */

import { MenuDataItem } from '@ant-design/pro-components';

const demo: MenuDataItem[] = [
  {
    name: 'demo',
    path: 'demo',
    icon: 'smile',
    routes: [
      {
        path: 'table',
        icon: 'smile',
        name: '表格Demo',
        component: '@/pages/demo/TableDemo',
        // access: 'accessRoute',
      },
      {
        icon: 'smile',
        name: '流程Demo',
        path: 'workflow',
        component: '@/pages/demo/WorkflowDemo',
        // access: 'accessRoute',
      },
      {
        icon: 'smile',
        name: '报表Demo',
        path: 'report',
        component: '@/pages/demo/ReportDemo',
        // access: 'accessRoute',
      },
      {
        icon: 'smile',
        name: '权限Demo',
        path: 'auth',
        component: '@/pages/demo/AuthDemo',
        // access: 'accessRoute',
      },
    ],
  },
];

export default demo;
