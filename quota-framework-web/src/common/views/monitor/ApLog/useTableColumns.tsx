/*
 * @Author: SHUANG
 * @Date: 2023-07-24 17:38:11
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-03-19 15:21:48
 * @Description:
 */
import { TableColumnsDefine } from '../../../../components/BaseTable/typings';
import { SwapLogListItem } from './typings';

const columns: TableColumnsDefine<SwapLogListItem> = [
  { dataIndex: 'index' },
  {
    title: 'ID',
    dataIndex: 'id',
  },
  {
    title: '业务类型',
    dataIndex: 'businessType',
    width: 100,
  },
  {
    title: '来源地址',
    dataIndex: 'address',
    search: false,
  },
  {
    title: '来源系统',
    dataIndex: 'sourceSystem',
    search: false,
    width: 100,
  },
  {
    title: '重试次数',
    dataIndex: 'repetitionNumber',
    valueType: 'digit',
    search: false,
    width: 80,
  },
  {
    title: '操作类型',
    dataIndex: 'sendType',
    valueType: 'select',
    search: false,
    width: 100,
  },
  {
    title: '提示消息',
    dataIndex: 'msg',
  },
  {
    title: '创建时间',
    dataIndex: 'createDatetime',
    valueType: 'dateRange',
    hideInTable: true,
  },
  {
    title: '创建时间',
    dataIndex: 'createDatetime',
    align: 'center',
    search: false,
  },
  {
    title: '备注',
    dataIndex: 'memo',
    search: false,
  },
  {
    title: '消息内容',
    dataIndex: 'content',
    hideInTable: true,
  },
];

export default columns;
