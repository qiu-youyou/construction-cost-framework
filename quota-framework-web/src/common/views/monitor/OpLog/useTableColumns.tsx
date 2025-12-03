/*
 * @Author: SHUANG
 * @Date: 2022-08-18 15:46:08
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-10-23 12:03:38
 * @Description:
 */

import { TableColumnsDefine } from '../../../../components/BaseTable/typings';
import { OpLogListItem } from './typings';

const columns: TableColumnsDefine<OpLogListItem> = [
  { dataIndex: 'index' },

  {
    title: '操作类型',
    dataIndex: 'operationType',
    align: 'center',
    width: 80,
  },
  {
    title: '业务类型',
    dataIndex: 'business',
  },
  {
    title: '操作内容',
    dataIndex: 'businessMethod',
  },
  {
    title: '操作明细',
    dataIndex: 'logOperation',
    search: false,
  },
  {
    title: '操作用户',
    dataIndex: 'userName',
    align: 'center',

    width: 80,
  },
  {
    title: '用户名',
    dataIndex: 'logUser',
    align: 'center',
    width: 80,
  },
  {
    title: '操作用户IP',
    dataIndex: 'ipAddress',
    align: 'center',
    search: false,
  },
  {
    title: '操作时间',
    dataIndex: 'createTime',
    valueType: 'dateRange',
    hideInTable: true,
  },
  {
    title: '操作时间',
    dataIndex: 'date',
    align: 'center',
    search: false,
  },
];

export default columns;
