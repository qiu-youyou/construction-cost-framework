/*
 * @Author: SHUANG
 * @Date: 2022-07-15 15:18:08
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-09-21 15:35:07
 * @Description:
 */

import { TableColumnsDefine } from '../../../components/BaseTable/typings';
import { NextUserListItem } from '../typing';

export const columns: TableColumnsDefine<NextUserListItem> = [
  { dataIndex: 'index' },
  {
    title: '员工代号',
    dataIndex: 'userName',
    align: 'center',
  },
  {
    title: '用户姓名',
    dataIndex: 'userRealname',
    align: 'center',
  },
  {
    title: '环节',
    dataIndex: 'positionsName',
    align: 'center',
  },
];

export default () => columns;
