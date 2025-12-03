/*
 * @Author: SHUANG
 * @Date: 2023-11-15 19:01:28
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-11-17 09:48:07
 * @Description: 标准综合单价库 - 清单明细 - 综合单价分析表
 */

import { TableColumnsDefine } from 'jd-framework-web/package/components';
import { UnitPriceAnalysisItem } from './typings';

const columns: TableColumnsDefine<UnitPriceAnalysisItem> = [
  {
    title: '编码',
    dataIndex: 'unitAnalysisCode',
    align: 'center',
    width: 70,
  },
  {
    title: '名称及规格',
    dataIndex: 'unitAnalysisName',
    valueType: 'textarea',
  },
  {
    title: '单位',
    dataIndex: 'unitAnalysisUnit',
    valueType: 'select',
    valueEnum: {},
  },
  {
    title: '数量',
    dataIndex: 'unitAnalysisAmount',
    valueType: 'digit',
  },
  {
    title: '单价(元)',
    dataIndex: 'unitAnalysisPrice',
    valueType: 'digit',
  },
  {
    title: '合价(元)',
    dataIndex: 'unitAnalysisPriceTotal',
    valueType: 'digit',
  },
];

export default columns;
