/*
 * @Author: SHUANG
 * @Date: 2023-11-13 18:42:59
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-11-14 11:37:42
 * @Description: 查询清单项目特征
 */

import { TableColumnsDefine } from 'jd-framework-web/package/components';
import { PropertiesParamsNormParamsItem } from '../../typings';

const columns: TableColumnsDefine<PropertiesParamsNormParamsItem> = [
  {
    title: '序号',
    dataIndex: 'index',
    width: 35,
  },
  {
    title: '定额参数编码',
    dataIndex: 'paramsCode',
    align: 'center',
    search: false,
    width: 80,
  },
  {
    title: '定额参数名称',
    dataIndex: 'paramsName',
  },
];

export default columns;
