/*
 * @Author: SHUANG
 * @Date: 2024-03-18 17:22:16
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-03-18 17:31:28
 * @Description: 工程造价-人材机汇总与调价 查看材料汇总
 */
import { TableColumnsDefine } from 'jd-framework-web/package/components';
import { MatTypeSummaryItem } from '../MatSummaryTable/typings';

const columns: TableColumnsDefine<MatTypeSummaryItem> = [
  {
    title: '序号',
    dataIndex: 'index',
  },
  {
    title: '材料分类',
    dataIndex: 'matTypeName',
  },
  {
    title: '单位',
    dataIndex: 'matTypeUnit',
    valueType: 'select',
  },
  {
    title: '数量',
    dataIndex: 'number',
    valueType: 'digit',
  },
];

export default columns;
