/*
 * @Author: SHUANG
 * @Date: 2023-10-16 11:29:25
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-02-21 16:34:57
 * @Description: 企业定额库
 */

import { MenuDataItem } from '@ant-design/pro-components';

const standard: MenuDataItem[] = [
  {
    path: 'standard',
    icon: 'FileTextOutlined',
    routes: [
      // {
      // 24.02.19 人材机重构与次材库合并 通用材料库
      //   name: '次材市场价格库',
      //   icon: 'FileTextOutlined',
      //   path: '/standard/subsidiary/mat',
      //   component: '@/pages/standard/StdSubsidiaryMat',
      //   access: 'accessRoute',
      // },
      {
        name: '标准WBS库',
        icon: 'FileTextOutlined',
        path: '/standard/wbs',
        component: '@/pages/standard/StdWbs',
        access: 'accessRoute',
      },
      {
        name: '装置性材料价格库',
        icon: 'FileTextOutlined',
        path: '/standard/device/mat',
        component: '@/pages/standard/StdDeviceMat',
        access: 'accessRoute',
      },
      {
        name: '清单关联定额映射库',
        icon: 'FileTextOutlined',
        path: '/standard/relation/norm',
        component: '@/pages/standard/StdRelationNorm',
        access: 'accessRoute',
      },
      {
        name: '标准综合单价库',
        icon: 'FileTextOutlined',
        path: '/standard/comprehensive/unit/price',
        component: '@/pages/standard/StdUnitPrice',
        access: 'accessRoute',
      },
      {
        name: '工程量分类库',
        icon: 'FileTextOutlined',
        path: '/standard/type/target',
        component: '@/pages/standard/StdTypeTarget',
        access: 'accessRoute',
      },
      {
        name: '材料统计分类库',
        icon: 'FileTextOutlined',
        path: '/standard/mat/type',
        component: '@/pages/standard/StdMatType',
        access: 'accessRoute',
      },
      {
        name: '其他费模板库',
        icon: 'FileTextOutlined',
        path: '/standard/otherfee/temp',
        component: '@/pages/standard/StdOtherFeeTemp',
        access: 'accessRoute',
      },
      {
        name: '项目汇总表模板库',
        icon: 'FileTextOutlined',
        path: '/standard/othersum/temp',
        component: '@/pages/standard/StdOtherSumTemp',
        access: 'accessRoute',
      },
      {
        name: '清单项目特征与定额参数特征映射库',
        icon: 'FileTextOutlined',
        path: '/standard/properties/params',
        component: '@/pages/standard/StdPropertiesParams',
        access: 'acessRoute',
      },
      {
        name: '项目相关设计文档库',
        icon: 'FileTextOutlined',
        path: '/standard/document',
        component: '@/pages/standard/StdDocument',
        access: 'accessRoute',
      },
    ],
  },
];

export default standard;
