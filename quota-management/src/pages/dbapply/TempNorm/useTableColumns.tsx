/*
 * @Author: SHUANG
 * @Date: 2024-04-17 15:25:31
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-18 10:04:38
 * @Description: 综合单价临时库
 */
import { Tag } from 'antd';
import { TableColumnsDefine } from 'jd-framework-web/package/components';

import { Typography } from 'antd';
const { Text } = Typography;

const syncDatabaseStatusEnum: any = {
  Y: { text: '已处理', color: 'green' },
  N: { text: '已拒绝', color: 'red' },
};

const columns: TableColumnsDefine<any> = [
  {
    title: '序号',
    dataIndex: 'index',
  },
  {
    title: '处理状态',
    dataIndex: 'syncDatabaseStatus',
    valueType: 'select',
    valueEnum: syncDatabaseStatusEnum,
    customRender: (_, { syncDatabaseStatus }) => {
      if (!syncDatabaseStatusEnum[syncDatabaseStatus]) return <Tag color="blue">待处理</Tag>;
      return (
        <Tag color={syncDatabaseStatusEnum[syncDatabaseStatus]?.color || ''}>
          {syncDatabaseStatusEnum[syncDatabaseStatus]?.text}
        </Tag>
      );
    },
  },

  {
    title: '产品名称',
    dataIndex: 'productName',
    width: 180,
  },
  {
    title: '阶段名称',
    dataIndex: 'stageName',
    width: 120,
  },
  {
    title: '项目编码',
    dataIndex: 'projectCode',
    align: 'center',
    width: 120,
  },
  {
    title: '项目名称',
    dataIndex: 'projectName',
    width: 180,
  },

  {
    title: '数据库',
    dataIndex: 'dbSimple',
    align: 'center',
    search: false,
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
    dataIndex: 'completeNormName',
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
    search: false,
    width: 70,
  },
  {
    title: '工程量',
    dataIndex: 'normAmount',
    valueType: 'digit',
    search: false,
    width: 80,
  },
  {
    title: '综合单价(元)',
    dataIndex: 'normComprehensivePrice',
    valueType: 'digit',
    search: false,
  },
  {
    title: '综合合价(元)',
    dataIndex: 'normComprehensivePriceTotal',
    valueType: 'digit',
    search: false,
  },
  {
    title: '取费类型',
    dataIndex: 'normFeeTypeName',
    align: 'center',
    search: false,
  },
  {
    title: '人工费(元)',
    dataIndex: 'normManPrice',
    valueType: 'digit',
    search: false,
  },
  {
    title: '材料费(元)',
    dataIndex: 'normMatPrice',
    valueType: 'digit',
    search: false,
  },
  {
    title: '机械费(元)',
    dataIndex: 'normMacPrice',
    valueType: 'digit',
    search: false,
  },
  {
    title: '定额基价(元)',
    dataIndex: 'normPrice',
    valueType: 'digit',
    search: false,
  },
  {
    title: '直接费(元)',
    dataIndex: 'normDirectFee',
    valueType: 'digit',
    search: false,
  },
  {
    title: '间接费(元)',
    dataIndex: 'normIndirectFee',
    valueType: 'digit',
    search: false,
  },
  {
    title: '管理费(元)',
    dataIndex: 'normManageFee',
    valueType: 'digit',
    search: false,
  },
  {
    title: '利润(元)',
    dataIndex: 'normProfitFee',
    valueType: 'digit',
    search: false,
  },
  {
    title: '税金(元)',
    dataIndex: 'normTaxationFee',
    valueType: 'digit',
    search: false,
  },
];

export default columns;
