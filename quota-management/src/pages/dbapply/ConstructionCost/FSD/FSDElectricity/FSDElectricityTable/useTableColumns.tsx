/*
 * @Author: SHUANG
 * @Date: 2024-04-16 15:45:42
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-16 16:17:41
 * @Description: 工程造价-风水电 供电点信息
 */

import { TableColumnsDefine } from 'jd-framework-web/package/components';
import ChangeLogText from 'jd-framework-web/package/components/ChangeLogText';
import { FSDElectricityItem } from '../typings';

const columns: TableColumnsDefine<FSDElectricityItem> = [
  {
    title: '序号',
    dataIndex: 'index',
    align: 'center',
    width: 55,
  },
  {
    title: '供电点名称',
    dataIndex: 'eleName',
    cellEdit: true,
  },
  {
    title: '供电比例(%)',
    dataIndex: 'eleRatio',
    valueType: 'digit',
    cellEdit: true,
  },
  {
    title: '电价',
    dataIndex: 'elePrice',
    valueType: 'digit',
    cellEdit: true,
  },
  {
    title: '备注',
    dataIndex: 'eleNote',
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
