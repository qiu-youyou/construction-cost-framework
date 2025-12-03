/*
 * @Author: SHUANG
 * @Date: 2024-01-18 09:52:29
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-03-22 17:03:41
 * @Description:工程造价-工程量指标汇总
 */
import { TableColumnsDefine } from 'jd-framework-web/package/components';
import { SubindexSummaryItem } from './typings';

const columns: TableColumnsDefine<SubindexSummaryItem> = [
  {
    title: '序号',
    dataIndex: 'index',
    align: 'center',
    width: 45,
  },
  {
    title: '指标编码',
    dataIndex: 'indexCode',
    align: 'center',
    width: 90,
  },
  {
    title: '指标名称',
    dataIndex: 'indexName',
  },
  {
    title: '单位',
    dataIndex: 'indexUnit',
    valueType: 'select',
    selectWritingIn: true,
    // request: () => valueEnumsRequest('UNIT'),
    // customFieldProps: { fieldNames: { label: 'label', value: 'label' } },
    search: false,
    width: 55,
  },
  {
    title: '数量',
    dataIndex: 'indexAmount',
    valueType: 'digit',
    search: false,
    width: 65,
  },
  {
    title: '单价(万元)',
    dataIndex: 'indexPrice',
    valueType: 'digit',
    search: false,
    width: 65,
  },
  {
    title: '合价(万元)',
    dataIndex: 'indexTotal',
    valueType: 'digit',
    search: false,
    width: 65,
  },
];

export default columns;
