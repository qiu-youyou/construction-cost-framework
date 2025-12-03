/*
 * @Author: SHUANG
 * @Date: 2024-04-16 16:53:29
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-23 16:31:38
 * @Description: 工程造价-风水电 供电点信息 综合电价
 */

import { FormColumnsDefine } from 'jd-framework-web/package/components';
import { FSDElectricityItem } from '../typings';

const columns: FormColumnsDefine<FSDElectricityItem> = [
  {
    title: '外购电比例',
    dataIndex: 'eleOutsideRatio',
    valueType: 'digit',
    width: 100,
    customFieldProps: { disabled: true },
  },
  {
    title: '自发电比例',
    dataIndex: 'eleOneselfRatio',
    valueType: 'digit',
    width: 100,
    customFieldProps: { disabled: true },
  },
  {
    title: '其它供电比例',
    dataIndex: 'eleOtherRatio',
    valueType: 'digit',
    width: 100,
    customFieldProps: { disabled: true },
  },
  {
    title: '其它供电电价',
    dataIndex: 'eleOtherPrice',
    valueType: 'digit',
    width: 100,
  },
  {
    title: '外购电电价',
    dataIndex: 'eleOutsidePrice',
    valueType: 'digit',
    width: 100,
    customFieldProps: { disabled: true },
  },
  {
    title: '自发电电价',
    dataIndex: 'eleOneselfPrice',
    valueType: 'digit',
    width: 100,
    customFieldProps: { disabled: true },
  },
  {
    title: '综合电价(元/kwh)',
    dataIndex: 'elePrice',
    valueType: 'digit',
    width: 100,
    customFieldProps: { disabled: true },
  },
];

export default columns;
