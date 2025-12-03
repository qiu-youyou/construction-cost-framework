/*
 * @Author: SHUANG
 * @Date: 2023-11-09 14:36:32
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-02-19 15:43:33
 * @Description: 标准库-次材市场价格库-明细
 */

import { TableColumnsDefine } from 'jd-framework-web/package/components';
import { valueEnumsRequest } from '../valueEnums';
import { SubsidiaryMatDetailItem } from './typings';

const columns: TableColumnsDefine<SubsidiaryMatDetailItem> = [
  {
    title: '序号',
    dataIndex: 'index',
    align: 'center',
    width: 40,
  },
  {
    title: '材料编码',
    dataIndex: 'matCode',
    align: 'center',
    cellEdit: true,
    width: 85,
  },
  {
    title: '材料名称',
    dataIndex: 'matName',
    cellEdit: true,
  },
  {
    title: '单位',
    dataIndex: 'matUnit',
    valueType: 'select',
    selectWritingIn: true,
    request: () => valueEnumsRequest('UNIT'),
    customFieldProps: { fieldNames: { label: 'label', value: 'label' } },
    cellEdit: true,
    search: false,
    width: 60,
  },
  {
    title: '单价(元)',
    dataIndex: 'matNotTaxPrice',
    valueType: 'digit',
    cellEdit: true,
    search: false,
    width: 60,
  },
  {
    title: '是否关联章节',
    dataIndex: 'scope',
    hideInTable: true,
    valueType: 'checkbox',
    initialValue: '1',
    valueEnum: { 1: { text: ' ' } },
  },
];

export default columns;
