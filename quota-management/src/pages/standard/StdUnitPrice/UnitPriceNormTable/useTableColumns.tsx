/*
 * @Author: SHUANG
 * @Date: 2023-11-16 09:30:41
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-03-20 13:56:21
 * @Description: 标准综合单价库 - 清单定额
 */
import { TableColumnsDefine } from 'jd-framework-web/package/components';
import ChangeLogText from 'jd-framework-web/package/components/ChangeLogText';
import { UnitPriceNormItem } from './typings';

import { Typography } from 'antd';
const { Text } = Typography;

/** 默认列配置 */
export const columnsState = {
  defaultValue: {
    normManPrice: { show: false },
    normMatPrice: { show: false },
    normMacPrice: { show: false },
    normPrice: { show: false },
    normDirectFee: { show: false },
    normIndirectFee: { show: false },
    normManageFee: { show: false },
    normProfitFee: { show: false },
    normTaxationFee: { show: false },
  },
};

const columns: TableColumnsDefine<UnitPriceNormItem> = [
  {
    title: '序号',
    dataIndex: 'index',
    align: 'center',
  },
  {
    title: '数据库',
    dataIndex: 'dbSimple',
    align: 'center',
    width: 140,
  },
  {
    title: '定额编码',
    dataIndex: 'normCode',
    align: 'center',
    width: 110,
  },
  {
    title: '定额名称',
    dataIndex: 'normName',
    ellipsis: false,
    customRender: (_, { normName, completeNormName }) => {
      const finalRender = (normName || '') + ' ' + (completeNormName || '');
      return <Text ellipsis={{ tooltip: finalRender }}>{finalRender}</Text>;
    },
    width: 200,
  },
  {
    title: '单位',
    dataIndex: 'normUnit',
    valueType: 'select',
    valueEnum: {},
    width: 70,
  },
  {
    title: '工程量',
    dataIndex: 'normAmount',
    valueType: 'digit',
    cellEdit: true,
    width: 80,
  },
  {
    title: '综合单价(元)',
    dataIndex: 'normComprehensivePrice',
    valueType: 'digit',
  },
  {
    title: '综合合价(元)',
    dataIndex: 'normComprehensivePriceTotal',
    valueType: 'digit',
  },
  {
    title: '取费类型',
    dataIndex: 'normFeeTypeName',
    align: 'center',
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
  {
    title: '修改记录',
    dataIndex: 'normLog',
    valueType: 'textarea',
    ellipsis: false,
    customRender: (_, { normLog }) => {
      return <ChangeLogText changeLog={normLog} />;
    },
  },
];

export default columns;
