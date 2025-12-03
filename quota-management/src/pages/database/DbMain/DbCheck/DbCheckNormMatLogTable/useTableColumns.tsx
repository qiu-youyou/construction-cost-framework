/*
 * @Author: SHUANG
 * @Date: 2023-11-21 17:35:50
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-02-27 11:57:55
 * @Description: 定额库-定额审查 数据校核
 */
import { Typography } from 'antd';

import { TableColumnsDefine } from 'jd-framework-web/package/components';
import ChangeLogText from 'jd-framework-web/package/components/ChangeLogText';
import { DbCheckNormMatByLogItem } from '../typings';

const { Text } = Typography;

const columns: TableColumnsDefine<DbCheckNormMatByLogItem> = [
  {
    title: '序号',
    dataIndex: 'index',
  },
  {
    title: '定额修改信息',
    search: false,
    children: [
      {
        title: '定额编码',
        dataIndex: 'normCode',
        align: 'center',
        width: 100,
        onCell: (_) => ({ rowSpan: _?.rowSpan }),
      },

      {
        title: '定额名称',
        dataIndex: 'normName',
        width: 180,
        ellipsis: false,
        customRender: (_, { rowSpan, normName, completeNormName }) => {
          const finalRender = (normName || '') + ' ' + (completeNormName || '');

          return rowSpan && rowSpan > 1 ? (
            finalRender
          ) : (
            <Text ellipsis={{ tooltip: finalRender }}>{finalRender}</Text>
          );
        },
        onCell: (_) => ({ rowSpan: _?.rowSpan }),
      },
      {
        title: '单位',
        dataIndex: 'normUnit',
        align: 'center',
        width: 70,
        onCell: (_) => ({ rowSpan: _?.rowSpan }),
      },
      {
        title: '基价(元)',
        dataIndex: 'normPrice',
        valueType: 'digit',
        onCell: (_) => ({ rowSpan: _?.rowSpan }),
        width: 115,
      },
      {
        title: '人工费(元)',
        dataIndex: 'normManPrice',
        valueType: 'digit',
        onCell: (_) => ({ rowSpan: _?.rowSpan }),
      },
      {
        title: '材料费(元)',
        dataIndex: 'normMatPrice',
        valueType: 'digit',
        onCell: (_) => ({ rowSpan: _?.rowSpan }),
      },
      {
        title: '机械费(元)',
        dataIndex: 'normMacPrice',
        valueType: 'digit',
        onCell: (_) => ({ rowSpan: _?.rowSpan }),
      },
      {
        title: '修改记录',
        dataIndex: 'normLog',
        valueType: 'textarea',
        ellipsis: false,
        customRender: (_, { rowSpan, normLog }) => {
          return rowSpan && rowSpan > 1 ? _ : <ChangeLogText changeLog={normLog} />;
        },
        onCell: (_) => ({ rowSpan: _?.rowSpan }),
      },
    ],
  },
  {
    title: '人材机含量修改信息',
    search: false,
    children: [
      {
        title: '材料编码',
        dataIndex: 'matCode',
        align: 'center',
        width: 100,
      },
      {
        title: '材料名称',
        dataIndex: 'matName',
        valueType: 'textarea',
      },
      {
        title: '材料单位',
        dataIndex: 'matUnit',
        align: 'center',
        width: 65,
      },
      {
        title: '单价(元)',
        dataIndex: 'matPrice',
        valueType: 'digit',
      },
      {
        title: '含量',
        dataIndex: 'matAmountSrc',
        valueType: 'digit',
      },
      {
        title: '修改记录',
        dataIndex: 'matLog',
        valueType: 'textarea',
        ellipsis: false,
        customRender: (_, { matLog }) => <ChangeLogText changeLog={matLog} />,
      },
    ],
  },

  {
    title: '定额修改记录时段',
    dataIndex: 'normDateTime',
    valueType: 'dateRange',
    hideInTable: true,
  },

  {
    title: '人材机修改记录时段',
    dataIndex: 'rcjDateTime',
    valueType: 'dateRange',
    hideInTable: true,
  },
];

export default columns;
