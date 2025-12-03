/*
 * @Author: SHUANG
 * @Date: 2023-11-06 11:32:25
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-02-27 11:58:38
 * @Description: 清单关联定额映射库 - 清单 - 定额
 */
import { TableColumnsDefine } from 'jd-framework-web/package/components';
import { RelationNormItem } from './typings';

import { Typography } from 'antd';
const { Text } = Typography;

const columns: TableColumnsDefine<RelationNormItem> = [
  {
    title: '序号',
    dataIndex: 'index',
    width: 40,
  },
  {
    title: '数据库',
    dataIndex: 'dbSimple',
    align: 'center',
    width: 80,
  },
  {
    title: '定额编码',
    dataIndex: 'normCode',
    align: 'center',
    width: 70,
  },
  {
    title: '工序名称',
    dataIndex: 'normName',
    cellEdit: true,
    width: 80,
  },
  {
    title: '定额名称',
    dataIndex: 'normName',
    ellipsis: false,
    customRender: (_, { normName, completeNormName }) => {
      const finalRender = (normName || '') + ' ' + (completeNormName || '');
      return <Text ellipsis={{ tooltip: finalRender }}>{finalRender}</Text>;
    },
  },
  {
    title: '单位',
    dataIndex: 'normUnit',
    align: 'center',
    width: 60,
  },
];

export default columns;
