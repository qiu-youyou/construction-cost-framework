/*
 * @Author: SHUANG
 * @Date: 2023-11-16 18:34:50
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-11-17 10:19:39
 * @Description: 标准综合单价库 - 清单定额 - 取费表达式
 */

import { TableColumnsDefine } from 'jd-framework-web/package/components';
import { UnitPriceNormFeeExpItem } from './typings';

const columns: TableColumnsDefine<UnitPriceNormFeeExpItem> = [
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
