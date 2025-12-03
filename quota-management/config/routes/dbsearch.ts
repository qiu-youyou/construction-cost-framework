/*
 * @Author: SHUANG
 * @Date: 2023-12-27 09:26:56
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-12-28 14:04:28
 * @Description: 企业定额库查询
 */
import { MenuDataItem } from '@ant-design/pro-components';

const dbsearch: MenuDataItem[] = [
  {
    path: 'dbsearch',
    icon: 'FileSearchOutlined',
    routes: [
      {
        name: '企业定额查询',
        path: 'main',
        icon: 'FileSearchOutlined',
        component: '@/pages/database/DbSearch',
        access: 'accessRoute',
      },
    ],
  },
];

export default dbsearch;
