/*
 * @Author: SHUANG
 * @Date: 2023-11-16 18:34:50
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-11-17 13:43:35
 * @Description: 标准综合单价库 - 清单特征
 */

import { TableColumnsDefine } from 'jd-framework-web/package/components';
import { UnitPricePropertiesItem } from './typings';
import { valueEnumsRequest } from '../valueEnums';

const columns: TableColumnsDefine<UnitPricePropertiesItem> = [
  {
    title: '序号',
    dataIndex: 'index',
    align: 'center',
    width: 49,
  },

  {
    title: '项目特征名称',
    dataIndex: 'propertiesName',
    cellEdit: true,
  },

  {
    title: '单位',
    dataIndex: 'propertiesUnit',
    valueType: 'select',
    selectWritingIn: true,
    cellEdit: true,
    search: false,
    width: 70,
    request: async () => valueEnumsRequest('UNIT'),
    customFieldProps: { fieldNames: { label: 'label', value: 'label' } },
  },

  {
    title: '项目特征值',
    dataIndex: 'propertiesValue',
    cellEdit: true,
  },
];

export default columns;
