/*
 * @Author: SHUANG
 * @Date: 2023-11-17 15:08:12
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-11-17 15:33:06
 * @Description: 全费用定额测算
 */

import { TableColumnsDefine } from 'jd-framework-web/package/components';
import { DbLayerItem } from './typings';

const columns: TableColumnsDefine<DbLayerItem> = [
  {
    title: '序号',
    dataIndex: 'index',
    align: 'center',
    width: 50,
  },
  {
    title: '层级名称',
    dataIndex: 'layerName',
    width: 110,
  },
  {
    title: '定额库编码',
    dataIndex: 'dbCode',
    align: 'center',
    cellEdit: true,
    width: 110,
  },
  {
    title: '定额库名称',
    dataIndex: 'dbName',
    valueType: 'textarea',
  },
  {
    title: '定额库简称',
    dataIndex: 'dbSimple',
    width: 110,
  },
];

export default columns;
