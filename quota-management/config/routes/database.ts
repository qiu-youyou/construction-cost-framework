/*
 * @Author: SHUANG
 * @Date: 2023-10-16 11:29:25
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-02-29 11:19:29
 * @Description: 企业定额库
 */

import { MenuDataItem } from '@ant-design/pro-components';

const database: MenuDataItem[] = [
  {
    path: 'database',
    icon: 'DatabaseOutlined',
    routes: [
      {
        name: '企业定额库维护',
        path: '/database/main',
        icon: 'DatabaseOutlined',
        component: '@/pages/database/DbMain',
        access: 'accessRoute',
      },
      {
        name: '维护权限设置',
        path: '/database/access',
        icon: 'DatabaseOutlined',
        component: '@/pages/database/DbAccess',
        access: 'accessRoute',
      },
      {
        name: '取费模板维护',
        path: '/database/fee',
        icon: 'DatabaseOutlined',
        component: '@/pages/database/DbFeeDatabase',
        access: 'accessRoute',
      },
      {
        name: '章节参数维护',
        path: '/database/chapter/params',
        icon: 'DatabaseOutlined',
        component: '@/pages/database/DbChapterParams',
        access: 'accessRoute',
      },
      {
        name: '企业基础定额',
        path: '/database/basic/norm',
        icon: 'DatabaseOutlined',
        component: '@/pages/database/DbBasic',
        access: 'accessRoute',
      },
      {
        name: '全费用定额测算',
        path: '/database/layer/set',
        icon: 'DatabaseOutlined',
        component: '@/pages/layer/DbLayer',
        access: 'accessRoute',
      },
      {
        name: '定额标准发布',
        path: '/database/release',
        icon: 'DatabaseOutlined',
        component: '@/pages/database/DbRelease',
        access: 'accessRoute',
      },
      {
        // 24.02.19 人材机重构与次材库合并 通用材料库
        name: '通用材料库',
        path: '/database/mat/subsidiary',
        icon: 'DatabaseOutlined',
        component: '@/pages/database/DbMatSubsidiary',
        access: 'accessRoute',
      },
    ],
  },
];

export default database;
