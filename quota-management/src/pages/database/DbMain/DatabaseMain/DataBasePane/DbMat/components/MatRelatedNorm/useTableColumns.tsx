/*
 * @Author: SHUANG
 * @Date: 2023-11-07 16:55:17
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-02-27 12:00:32
 * @Description: Mat Main 人材机类型 - 查看相关定额
 */

import { TableColumnsDefine } from 'jd-framework-web/package/components';
import { DbNormItem } from '../../../DbNorm/DbNormTable/typings';
import { Typography } from 'antd';
const { Text } = Typography;

const columns: TableColumnsDefine<DbNormItem> = [
  {
    title: '序号',
    dataIndex: 'index',
    align: 'center',
    width: 55,
  },
  {
    title: '定额库名称',
    dataIndex: 'dbSimple',
    align: 'center',
    width: 130,
  },
  {
    title: '定额编码',
    dataIndex: 'normCode',
    align: 'center',
    cellEdit: true,
    width: 100,
  },
  {
    title: '定额名称',
    dataIndex: 'normName',
    valueType: 'textarea',
    cellEdit: true,
    ellipsis: false,
    customRender: (_, { normName, completeNormName }) => {
      const finalRender = (normName || '') + ' ' + (completeNormName || '');
      return <Text ellipsis={{ tooltip: finalRender }}>{finalRender}</Text>;
    },
  },
  {
    title: '单位',
    dataIndex: 'normUnit',
    align: 'center',
    search: false,
    width: 60,
  },
  {
    title: '基价(元)',
    dataIndex: 'normPrice',
    valueType: 'digit',
    search: false,
    width: 90,
  },
  {
    title: '人工费(元)',
    dataIndex: 'normManPrice',
    valueType: 'digit',
    search: false,
    width: 90,
  },
  {
    title: '材料费(元)',
    dataIndex: 'normMatPrice',
    valueType: 'digit',
    search: false,
    width: 90,
  },
  {
    title: '机械费(元)',
    dataIndex: 'normMacPrice',
    valueType: 'digit',
    search: false,
    width: 90,
  },
  {
    title: '含量',
    dataIndex: 'matAmountSrc',
    valueType: 'digit',
    search: false,
    width: 90,
  },
];

export default columns;
