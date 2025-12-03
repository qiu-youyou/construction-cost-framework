/*
 * @Author: SHUANG
 * @Date: 2023-11-10 09:12:48
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-01 16:21:11
 * @Description: 标准库-材料统计分类库
 */

import { TableColumnsDefine } from 'jd-framework-web/package/components';
import { valueEnumsRequest } from './valueEnums';
import { OtherMatTypeItem } from './typings';

const columns: TableColumnsDefine<OtherMatTypeItem> = [
  {
    title: '序号',
    dataIndex: 'index',
    align: 'center',
    width: 35,
  },
  {
    title: '材料分类编码',
    dataIndex: 'matTypeCode',
    align: 'center',
    cellEdit: true,
    width: 100,
  },
  {
    title: '材料分类名称',
    dataIndex: 'matTypeName',
    cellEdit: true,
  },
  {
    title: '单位',
    dataIndex: 'matTypeUnit',
    valueType: 'select',
    selectWritingIn: true,
    request: () => valueEnumsRequest('UNIT'),
    customFieldProps: { fieldNames: { label: 'label', value: 'label' } },
    cellEdit: true,
    search: false,
    width: 55,
  },
];

export default columns;
