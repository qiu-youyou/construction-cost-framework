/*
 * @Author: SHUANG
 * @Date: 2023-11-09 11:36:46
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-11-24 15:21:11
 * @Description: 标准库-装置性材料价格库-明细
 */

import { TableColumnsDefine } from 'jd-framework-web/package/components';
import { DeviceMatDetailItem } from './typings';
import { valueEnumsRequest } from '../valueEnums';

const columns: TableColumnsDefine<DeviceMatDetailItem> = [
  {
    title: '序号',
    dataIndex: 'index',
    align: 'center',
    width: 50,
  },
  {
    title: '材料编码',
    dataIndex: 'matCode',
    align: 'center',
    cellEdit: true,
    width: 90,
  },
  {
    title: '材料名称',
    dataIndex: 'matName',
    cellEdit: true,
    width: 140,
  },
  {
    title: '规格',
    dataIndex: 'matSpecify',
    cellEdit: true,
    width: 240,
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
    width: 85,
  },
  {
    title: '单重',
    dataIndex: 'matSingleWeight',
    valueType: 'digit',
    cellEdit: true,
    search: false,
    width: 85,
  },
  {
    title: '不含税价(元)',
    dataIndex: 'matNotTaxPrice',
    valueType: 'digit',
    cellEdit: true,
    search: false,
    width: 85,
  },
  {
    title: '含税价(元)',
    dataIndex: 'matIncludeTaxPrice',
    valueType: 'digit',
    cellEdit: true,
    search: false,
    width: 85,
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
