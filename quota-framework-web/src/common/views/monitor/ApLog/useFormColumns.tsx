/*
 * @Author: SHUANG
 * @Date: 2023-07-24 09:44:18
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-10-24 11:53:34
 * @Description:
 */

import { FormColumnsDefine } from '../../../../components/BaseSchemaForm/typings';
import { SwapLogListItem } from './typings';

const columns: FormColumnsDefine<SwapLogListItem> = [
  {
    dataIndex: 'id',
    hideInForm: true,
  },
  {
    title: '备注',
    dataIndex: 'memo',
    valueType: 'textarea',
    customFieldProps: { rows: 2 },
  },
];

export default columns;
