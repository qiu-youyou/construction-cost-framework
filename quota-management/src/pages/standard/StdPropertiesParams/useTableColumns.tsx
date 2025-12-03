/*
 * @Author: SHUANG
 * @Date: 2023-11-13 17:22:36
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-11-17 13:42:43
 * @Description: 清单项目特征与定额参数特征映射库
 */

import { TableColumnsDefine } from 'jd-framework-web/package/components';
import { PropertiesParamsItem } from './typings';

const columns: TableColumnsDefine<PropertiesParamsItem> = [
  {
    title: '序号',
    dataIndex: 'index',
    align: 'center',
    width: 25,
  },
  {
    title: '清单特征名称',
    dataIndex: 'propertiesName',
    cellEdit: true,
  },
  {
    title: '定额参数名称',
    dataIndex: 'paramsName',
  },
  {
    title: '备注',
    dataIndex: 'relateNote',
    valueType: 'textarea',
    cellEdit: true,
    search: false,
  },
];

export default columns;
