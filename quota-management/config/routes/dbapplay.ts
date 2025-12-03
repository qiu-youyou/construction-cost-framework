/*
 * @Author: SHUANG
 * @Date: 2023-12-27 09:26:56
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-17 16:15:22
 * @Description: 工程造价产品
 */
import { MenuDataItem } from '@ant-design/pro-components';

const dbapply: MenuDataItem[] = [
  {
    path: 'dbapply',
    icon: 'NodeIndexOutlined',
    routes: [
      {
        name: '工程造价产品',
        path: '/dbapply/product',
        icon: 'FileSearchOutlined',
        component: '@/pages/dbapply/Product',
        access: 'accessRoute',
      },
      {
        name: '工程造价对比',
        path: '/dbapply/comparison',
        icon: 'FileSearchOutlined',
        component: '@/pages/dbapply/Comparison',
        access: 'accessRoute',
      },

      {
        name: '综合单价临时库',
        path: '/dbapply/temp/unitprice',
        icon: 'FileSearchOutlined',
        component: '@/pages/dbapply/TempUnitPrice',
        access: 'accessRoute',
      },

      {
        name: '定额临时库',
        path: '/dbapply/temp/norm',
        icon: 'FileSearchOutlined',
        component: '@/pages/dbapply/TempNorm',
        access: 'accessRoute',
      },

      {
        name: '人材机临时库',
        path: '/dbapply/temp/mat',
        icon: 'FileSearchOutlined',
        component: '@/pages/dbapply/TempNormMat',
        access: 'accessRoute',
      },
    ],
  },
];

export default dbapply;
