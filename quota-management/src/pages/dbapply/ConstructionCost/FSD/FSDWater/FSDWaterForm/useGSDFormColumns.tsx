/*
 * @Author: SHUANG
 * @Date: 2024-04-24 16:55:27
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-24 17:08:10
 * @Description:
 */
import { FormColumnsDefine } from 'jd-framework-web/package/components';
import { FSDWaterItem } from '../typings';

const columns: FormColumnsDefine<FSDWaterItem> = [
  {
    title: '供水点名称',
    dataIndex: 'waterName',
  },
  {
    title: '供水比例',
    dataIndex: 'waterRatio',
    valueType: 'digit',
    width: 100,
  },
  {
    title: '本供水区水价(元/m)',
    dataIndex: 'waterPrice',
    valueType: 'digit',
    width: 100,
  },
];

export default columns;
