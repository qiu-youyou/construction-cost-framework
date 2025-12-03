/*
 * @Author: SHUANG
 * @Date: 2023-12-27 09:26:56
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-12-28 17:41:41
 * @Description: 企业定额库查询
 */
import { MenuDataItem } from '@ant-design/pro-components';

const home: MenuDataItem[] = [
  {
    path: 'home',
    icon: 'HomeOutlined',
    routes: [
      {
        name: '首页',
        path: '/home/index',
        component: '@/common/views/home',
        icon: 'HomeOutlined',
      },
      {
        name: '首页',
        hideInMenu: true,
        path: '/home/index/:businessKey/:businessId',
        component: '@/common/views/home',
      },
      {
        name: '首页',
        hideInMenu: true,
        path: '/home/index/:businessKey/:businessId/:notice/:noticeId',
        component: '@/common/views/home',
      },
    ],
  },
];

export default home;
