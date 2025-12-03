/*
 * @Author: SHUANG
 * @Date: 2023-11-17 16:33:57
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-02-27 11:58:33
 * @Description: 全费用定额测算
 */
import { TableColumnsDefine } from 'jd-framework-web/package/components';
import { DbLayerNormItem } from './typings';

import { Typography } from 'antd';
const { Text } = Typography;

const columns: TableColumnsDefine<DbLayerNormItem> = [
  {
    title: '序号',
    dataIndex: 'index',
    align: 'center',
    width: 55,
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
    cellEdit: true,
    width: 240,
    ellipsis: false,
    customRender: (_, { normName, completeNormName }) => {
      const finalRender = (normName || '') + ' ' + (completeNormName || '');
      return <Text ellipsis={{ tooltip: finalRender }}>{finalRender}</Text>;
    },
  },
  {
    title: '单位',
    dataIndex: 'normUnit',
    valueType: 'select',
    valueEnum: {},
    width: 70,
  },
  {
    title: '综合单价(元)',
    dataIndex: 'normComprehensivePrice',
    valueType: 'digit',
  },
  {
    title: '取费类型',
    dataIndex: 'normFeeTypeName',
    valueType: 'textarea',
    align: 'center',
    width: 160,
  },
  {
    title: '人工费(元)',
    dataIndex: 'normManPrice',
    valueType: 'digit',
  },
  {
    title: '材料费(元)',
    dataIndex: 'normMatPrice',
    valueType: 'digit',
  },
  {
    title: '机械费(元)',
    dataIndex: 'normMacPrice',
    valueType: 'digit',
  },
  {
    title: '定额基价(元)',
    dataIndex: 'normPrice',
    valueType: 'digit',
  },
  // {
  //   title: '基价价差(元)',
  //   dataIndex: 'normBasisDiff',
  //   valueType: 'digit',
  // },
  {
    title: '直接费(元)',
    dataIndex: 'normDirectFee',
    valueType: 'digit',
  },
  {
    title: '间接费(元)',
    dataIndex: 'normIndirectFee',
    valueType: 'digit',
  },
  {
    title: '管理费(元)',
    dataIndex: 'normManageFee',
    valueType: 'digit',
  },
  {
    title: '利润(元)',
    dataIndex: 'normProfitFee',
    valueType: 'digit',
  },
  {
    title: '税金(元)',
    dataIndex: 'normTaxationFee',
    valueType: 'digit',
  },
];

export default columns;
