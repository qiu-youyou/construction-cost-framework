/*
 * @Author: SHUANG
 * @Date: 2024-04-22 11:40:40
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-22 13:46:23
 * @Description: 工程造价-运保杂费计算 来源地 分段运输费用
 */
import ChangeLogText from 'jd-framework-web/package/components/ChangeLogText';
import { TableColumnsDefine } from 'jd-framework-web/package/components';
import { TransportOriginOtherItem } from '../../typings';

const columns: TableColumnsDefine<TransportOriginOtherItem> = [
  {
    title: '序号',
    dataIndex: 'index',
    align: 'center',
    width: 55,
  },
  {
    title: '段数',
    dataIndex: 'otherNumber',
    cellEdit: true,
    width: 120,
  },
  {
    title: '运距(KM)',
    dataIndex: 'otherDistance',
    valueType: 'digit',
    cellEdit: true,
  },
  {
    title: '运价系数',
    dataIndex: 'otherRate',
    valueType: 'digit',
    cellEdit: true,
  },
  {
    title: '除税',
    children: [
      {
        title: '运价(元/t.km)',
        dataIndex: 'otherPrice',
        valueType: 'digit',
        cellEdit: true,
      },
      {
        title: '运费(元/t)',
        dataIndex: 'otherTransportPrice',
        valueType: 'digit',
      },
    ],
  },
  {
    title: '含税',
    children: [
      {
        title: '运价(元/t.km)',
        dataIndex: 'otherPriceTax',
        valueType: 'digit',
      },
      {
        title: '运费(元/t)',
        dataIndex: 'otherTransportPriceTax',
        valueType: 'digit',
      },
    ],
  },

  {
    title: '备注',
    dataIndex: 'otherNote',
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
