/*
 * @Author: SHUANG
 * @Date: 2024-04-17 15:25:31
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-17 16:18:47
 * @Description: 综合单价临时库
 */
import { Tag } from 'antd';
import { TableColumnsDefine } from 'jd-framework-web/package/components';

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
    title: '单价编码',
    dataIndex: 'unitPriceCode',
    align: 'center',
    width: 100,
  },
  {
    title: '单价名称',
    dataIndex: 'unitPriceName',
    width: 140,
  },
  {
    title: '单位',
    dataIndex: 'unitPriceUnit',
    align: 'center',
    search: false,
    width: 70,
  },
  {
    title: '综合单价(元)',
    dataIndex: 'unitPricePrice',
    valueType: 'digit',
    search: false,
    width: 90,
  },
  {
    title: '其中主材费(元)',
    dataIndex: 'unitPriceMatPrice',
    valueType: 'digit',
    search: false,
  },
  {
    title: '其中施工费(元)',
    dataIndex: 'unitPriceBuildPrice',
    valueType: 'digit',
    search: false,
  },
  {
    title: '工作内容',
    dataIndex: 'unitPriceWork',
    valueType: 'textarea',
    search: false,
    width: 200,
  },
  {
    title: '清单计算规则',
    dataIndex: 'unitPriceCalcRule',
    valueType: 'textarea',
    search: false,
    width: 180,
  },
  {
    title: '项目特征描述',
    dataIndex: 'unitPriceProperty',
    valueType: 'textarea',
    search: false,
    width: 200,
  },
  {
    title: '单价类型',
    dataIndex: 'unitPriceTypeName',
    align: 'center',
    search: false,
    width: 110,
  },
];

export default columns;
