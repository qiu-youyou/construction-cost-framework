/*
 * @Author: SHUANG
 * @Date: 2024-01-18 09:52:29
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-03-29 11:32:13
 * @Description: 工程造价-WBS汇总
 */
import { TableColumnsDefine } from 'jd-framework-web/package/components';
import { WbsSummaryItem } from './typings';

const columns: TableColumnsDefine<WbsSummaryItem> = [
  {
    title: '序号',
    dataIndex: 'showNumber',
    width: 90,
  },
  {
    title: 'WBS编码',
    dataIndex: 'wbsCode',
    align: 'center',
    width: 90,
  },
  {
    title: 'WBS名称',
    dataIndex: 'wbsName',
  },
  {
    title: '单位',
    dataIndex: 'wbsUnit',
    valueType: 'select',
    selectWritingIn: true,
    // request: () => valueEnumsRequest('UNIT'),
    // customFieldProps: { fieldNames: { label: 'label', value: 'label' } },
    search: false,
    width: 60,
  },
  {
    title: '主材/设备合价(万元)',
    dataIndex: 'wbsEquipmentTotal',
    valueType: 'digit',
    search: false,
    width: 70,
  },
  {
    title: '施工/安装合价(万元)',
    dataIndex: 'wbsConstructTotal',
    valueType: 'digit',
    search: false,
    width: 70,
  },
  {
    title: '合计(万元)',
    dataIndex: 'wbsTotal',
    valueType: 'digit',
    search: false,
    width: 70,
  },
];

export default columns;
