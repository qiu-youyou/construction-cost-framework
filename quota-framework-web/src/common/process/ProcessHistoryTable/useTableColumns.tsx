/*
 * @Author: SHUANG
 * @Date: 2022-08-18 11:28:15
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-09-21 15:19:11
 * @Description:
 */
import { TableColumnsDefine } from '../../../components/BaseTable/typings';

const columns: TableColumnsDefine<any> = [
  {
    title: '节点名称',
    dataIndex: 'taskName',
    align: 'center',
    width: 90,
  },
  {
    title: '审批意见',
    dataIndex: 'message',
    align: 'center',
    width: 105,
  },
  {
    title: '状态',
    dataIndex: 'type',
    valueType: 'select',
    align: 'center',
    width: 45,
    valueEnum: {
      comment: { text: '通过', status: 'Success' },
      reject: { text: '退回', status: 'Error' },
      forward: { text: '转办', status: 'Warning' },
    },
    customFieldProps: { showSearch: true },
    // customRender: (_, { type }) => {
    //   if (type === 'comment') return <Tag color="success">通过</Tag>;
    //   if (type === 'reject') return <Tag color="error">退回</Tag>;
    //   if (type === 'forward') return <Tag color="warning">转办</Tag>;
    // },
  },
  {
    title: '环节创建时间',
    dataIndex: 'taskStartTime',
    align: 'center',
    width: 90,
  },
  {
    title: '环节完成时间',
    dataIndex: 'taskEndTime',
    align: 'center',
    width: 90,
  },
  {
    title: '持续时长',
    dataIndex: 'timeConsuming',
    align: 'center',
    width: 80,
  },
  {
    title: '审批人',
    dataIndex: 'fullName',
    align: 'center',

    width: 80,
  },
  {
    title: '审批人账号',
    dataIndex: 'userName',
    align: 'center',

    width: 70,
  },
];

export default () => columns;
