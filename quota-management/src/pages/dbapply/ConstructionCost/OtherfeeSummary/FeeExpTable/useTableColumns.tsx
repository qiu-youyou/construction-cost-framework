/*
 * @Author: SHUANG
 * @Date: 2024-01-17 14:31:35
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-03-29 13:42:57
 * @Description:
 */

import { TableColumnsDefine } from 'jd-framework-web/package/components';

const columns: TableColumnsDefine<any> = [
  {
    title: '序号',
    dataIndex: 'index',
    align: 'center',
    width: 50,
  },
  // {
  //   title: '表达式编码',
  //   dataIndex: 'expFeeCode',
  //   align: 'center',
  //   width: 110,
  // },
  {
    title: '表达式名称',
    dataIndex: 'expFeeName',
  },
  {
    title: '表达式金额(元)',
    dataIndex: 'expFeeValue',
    valueType: 'digit',
    width: 70,
  },
];

export default columns;
