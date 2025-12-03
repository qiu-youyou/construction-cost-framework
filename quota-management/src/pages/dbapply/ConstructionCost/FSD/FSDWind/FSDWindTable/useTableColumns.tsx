/*
 * @Author: SHUANG
 * @Date: 2024-04-16 15:45:42
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-16 16:08:05
 * @Description: 工程造价-风水电 供风点信息
 */

import { TableColumnsDefine } from 'jd-framework-web/package/components';
import ChangeLogText from 'jd-framework-web/package/components/ChangeLogText';
import { FSDWindItem } from '../typings';

const columns: TableColumnsDefine<FSDWindItem> = [
  {
    title: '序号',
    dataIndex: 'index',
    align: 'center',
    width: 55,
  },
  {
    title: '供风点名称',
    dataIndex: 'windName',
    cellEdit: true,
  },
  {
    title: '供风比例(%)',
    dataIndex: 'windRatio',
    valueType: 'digit',
    cellEdit: true,
  },
  {
    title: '风价',
    dataIndex: 'windPrice',
    valueType: 'digit',
    cellEdit: true,
  },
  {
    title: '备注',
    dataIndex: 'windNote',
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
