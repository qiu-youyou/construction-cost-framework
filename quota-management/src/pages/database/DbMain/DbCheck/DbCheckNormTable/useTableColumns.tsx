/*
 * @Author: SHUANG
 * @Date: 2023-11-21 17:35:50
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-02-27 11:58:00
 * @Description: 定额库-定额审查 数据校核
 */

import ChangeLogText from 'jd-framework-web/package/components/ChangeLogText';
import { TableColumnsDefine } from 'jd-framework-web/package/components';
import { DbCheckNormItem } from '../typings';

import { Typography } from 'antd';
const { Text } = Typography;

const columns: TableColumnsDefine<DbCheckNormItem> = [
  {
    title: '序号',
    dataIndex: 'index',
  },
  {
    title: '定额编码',
    dataIndex: 'normCode',
    align: 'center',
    width: 90,
  },
  {
    title: '定额名称',
    dataIndex: 'normName',
    valueType: 'textarea',
    ellipsis: false,
    customRender: (_, { normName, completeNormName }) => {
      const finalRender = (normName || '') + ' ' + (completeNormName || '');
      return <Text ellipsis={{ tooltip: finalRender }}>{finalRender}</Text>;
    },
  },
  {
    title: '校核',
    dataIndex: 'checkCode',
    valueType: 'textarea',
  },
  {
    title: '单位',
    dataIndex: 'normUnit',
    align: 'center',
    width: 60,
  },
  {
    title: '基价(元)',
    dataIndex: 'normPrice',
    valueType: 'digit',
    search: false,
    width: 90,
  },
  {
    title: '人工费(元)',
    dataIndex: 'normManPrice',
    valueType: 'digit',
    search: false,
    width: 90,
  },
  {
    title: '材料费(元)',
    dataIndex: 'normMatPrice',
    valueType: 'digit',
    search: false,
    width: 90,
  },
  {
    title: '机械费(元)',
    dataIndex: 'normMacPrice',
    valueType: 'digit',
    search: false,
    width: 90,
  },
  {
    title: '修改记录',
    dataIndex: 'normLog',
    valueType: 'textarea',
    ellipsis: false,
    customRender: (_, { normLog }) => <ChangeLogText changeLog={normLog} />,
    search: false,
  },
  // {
  //   title: '备注',
  //   dataIndex: 'normNote',
  //   width: 120,
  // },
];

export default columns;
