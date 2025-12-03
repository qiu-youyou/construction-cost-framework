/*
 * @Author: SHUANG
 * @Date: 2023-11-15 14:20:45
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-03-07 11:25:07
 * @Description: 标准综合单价库 - 清单明细
 */
import { TableColumnsDefine } from 'jd-framework-web/package/components';

import { valueEnumsRequest } from '../valueEnums';
import { UnitPriceDetailItem } from './typings';

const columns: TableColumnsDefine<UnitPriceDetailItem> = [
  {
    title: '序号',
    dataIndex: 'showNumber',
    align: 'left',
    width: 85,
  },
  {
    title: '单价编码',
    dataIndex: 'unitPriceCode',
    align: 'center',
    cellEdit: true,
    width: 100,
  },
  {
    title: '单价名称',
    dataIndex: 'unitPriceName',
    cellEdit: true,
    width: 140,
  },
  {
    title: '单位',
    dataIndex: 'unitPriceUnit',
    valueType: 'select',
    selectWritingIn: true,
    cellEdit: true,
    search: false,
    width: 70,
    request: async () => valueEnumsRequest('UNIT'),
    customFieldProps: { fieldNames: { label: 'label', value: 'label' } },
  },
  {
    title: '综合单价(元)',
    dataIndex: 'unitPricePrice',
    valueType: 'digit',
    search: false,
    width: 90,
  },
  {
    title: '其中主材费(元)',
    dataIndex: 'unitPriceMatPrice',
    valueType: 'digit',
    search: false,
  },
  {
    title: '其中施工费(元)',
    dataIndex: 'unitPriceBuildPrice',
    valueType: 'digit',
    search: false,
  },
  {
    title: '工作内容',
    dataIndex: 'unitPriceWork',
    valueType: 'textarea',
    cellEdit: true,
    search: false,
    width: 200,
  },
  {
    title: '清单计算规则',
    dataIndex: 'unitPriceCalcRule',
    valueType: 'textarea',
    cellEdit: true,
    search: false,
    width: 180,
  },
  {
    title: '项目特征描述',
    dataIndex: 'unitPriceProperty',
    valueType: 'textarea',
    search: false,
    width: 200,
  },
  {
    title: '单价类型',
    dataIndex: 'unitPriceTypeName',
    align: 'center',
    search: false,
    width: 110,
  },
];

export default columns;
