/*
 * @Author: SHUANG
 * @Date: 2023-11-10 09:12:48
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-11-21 09:51:32
 * @Description: 标准库-工程量分类库
 */

import { TableColumnsDefine } from 'jd-framework-web/package/components';
import { valueEnumsRequest } from './valueEnums';
import { OtherTypeApiItem } from './typings';

const columns: TableColumnsDefine<OtherTypeApiItem> = [
  {
    title: '序号',
    dataIndex: 'index',
    align: 'center',
    width: 35,
  },
  {
    title: '指标分类编码',
    dataIndex: 'kpiCode',
    align: 'center',
    cellEdit: true,
    width: 80,
  },
  {
    title: '指标分类名称',
    dataIndex: 'kpiName',
    cellEdit: true,
  },
  {
    title: '单位',
    dataIndex: 'kpiUnit',
    valueType: 'select',
    selectWritingIn: true,
    request: () => valueEnumsRequest('UNIT'),
    customFieldProps: { fieldNames: { label: 'label', value: 'label' } },
    cellEdit: true,
    search: false,
    width: 50,
  },
];

export default columns;
