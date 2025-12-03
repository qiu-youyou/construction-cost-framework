/*
 * @Author: SHUANG
 * @Date: 2024-04-17 15:25:31
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-17 16:28:49
 * @Description: 综合单价临时库
 */
import { CheckSquareOutlined } from '@ant-design/icons';
import { Checkbox, Tag } from 'antd';
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
    width: 200,
  },

  {
    title: '类型',
    dataIndex: 'matRcjType',
    valueType: 'select',
    search: false,
    valueEnum: {
      1: { text: '人工' },
      2: { text: '材料' },
      3: { text: '机械' },
      4: { text: '机械台班' },
      5: { text: '混凝土' },
    },
    width: 80,
  },
  {
    title: '材料编码',
    dataIndex: 'matCode',
    align: 'center',
    width: 120,
  },
  {
    title: '材料名称',
    dataIndex: 'matName',
    width: 160,
  },
  {
    title: '单位',
    dataIndex: 'matUnit',
    align: 'center',
    search: false,
    width: 80,
  },
  {
    title: '单价(元)',
    dataIndex: 'matPrice',
    valueType: 'digit',
    search: false,
  },

  {
    title: '标准含量',
    dataIndex: 'matAmountSrc',
    valueType: 'digit',
    cellEdit: ({ parentId }) => parentId == '0',
    search: false,
    width: 85,
  },
  {
    title: '企业含量',
    dataIndex: 'matAmount',
    valueType: 'digit',
    search: false,
    width: 85,
  },
  {
    title: '来源含量',
    dataIndex: 'matAmountSrcOld',
    valueType: 'digit',
    search: false,
    width: 85,
  },

  {
    title: '主材标识',
    dataIndex: 'matIsMain',
    align: 'center',
    ellipsis: false,
    search: false,
    width: 70,
    customRender: (_, dbNormMatContentItem) => {
      // /** 是否有合计标识 */
      let matIsMain = dbNormMatContentItem?.matIsMain === 'Y';
      return <Checkbox checked={matIsMain} />;
    },
  },
  {
    title: '配合比',
    dataIndex: 'hasChildren',
    align: 'center',
    search: false,
    width: 70,
    customRender: (_, dbNormMatContentItem) => {
      return dbNormMatContentItem?.hasChildren == true ? (
        <CheckSquareOutlined style={{ fontSize: 15 }} />
      ) : (
        ''
      );
    },
  },
];

export default columns;
