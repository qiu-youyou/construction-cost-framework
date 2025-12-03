/*
 * @Author: SHUANG
 * @Date: 2024-01-11 14:26:58
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-02-27 14:46:06
 * @Description: 工程造价-工程量清单编制-分部分项清单表 项目特征
 */

import { TableColumnsDefine } from 'jd-framework-web/package/components';
import { valueEnumsRequest } from '../../../valueEnums';
import { InventoryPropertItem } from './typings';

const columns: TableColumnsDefine<InventoryPropertItem> = [
  {
    title: '项目特征名称',
    dataIndex: 'propertiesName',
    cellEdit: true,
  },
  {
    title: '单位',
    dataIndex: 'propertiesUnit',
    valueType: 'select',
    request: async () => valueEnumsRequest('UNIT'),
    customFieldProps: { fieldNames: { label: 'label', value: 'label' } },
    selectWritingIn: true,
    cellEdit: true,
    width: 70,
  },
  {
    title: '项目特征值',
    dataIndex: 'propertiesValue',
    align: 'center',
    cellEdit: true,
    width: 90,
  },
];

export default columns;
