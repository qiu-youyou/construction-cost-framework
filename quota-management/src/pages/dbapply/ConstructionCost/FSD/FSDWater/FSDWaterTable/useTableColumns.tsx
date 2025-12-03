/*
 * @Author: SHUANG
 * @Date: 2024-04-16 15:45:42
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-26 15:06:41
 * @Description: 工程造价-风水电 价区及供水点
 */

import { TableColumnsDefine } from 'jd-framework-web/package/components';
import ChangeLogText from 'jd-framework-web/package/components/ChangeLogText';
import { FSDWaterItem } from '../typings';

const columns: TableColumnsDefine<FSDWaterItem> = [
  {
    title: '序号',
    dataIndex: 'showNumber',
    align: 'left',
    width: 120,
  },
  {
    title: '名称',
    dataIndex: 'waterName',
    cellEdit: true,
  },
  {
    title: '比例(%)',
    dataIndex: 'waterRatio',
    valueType: 'digit',
    cellEdit: (item) => item?.level != '3',
  },
  {
    title: '水价',
    dataIndex: 'waterPrice',
    valueType: 'digit',
    cellEdit: true,
  },
  {
    title: '备注',
    dataIndex: 'waterNote',
    cellEdit: true,
  },
  {
    title: '修改记录',
    dataIndex: 'changeLog',
    valueType: 'textarea',
    ellipsis: false,
    customRender: (_, { changeLog }) => <ChangeLogText changeLog={changeLog} />,
  },
];

export default columns;
