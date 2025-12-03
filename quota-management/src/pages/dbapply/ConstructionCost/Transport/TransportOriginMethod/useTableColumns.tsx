/*
 * @Author: SHUANG
 * @Date: 2024-04-15 17:35:19
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-17 10:31:53
 * @Description: 工程造价-运保杂费计算 来源地 运输方式
 */
import ChangeLogText from 'jd-framework-web/package/components/ChangeLogText';
import { TableColumnsDefine } from 'jd-framework-web/package/components';

const columns: TableColumnsDefine<any> = [
  {
    title: '序号',
    dataIndex: 'index',
    align: 'center',
    width: 55,
  },
  {
    title: '运输方式',
    dataIndex: 'metName',
    width: 180,
  },
  {
    title: '起止地点',
    dataIndex: 'metAddress',
    cellEdit: true,
    width: 240,
  },
  {
    title: '除税',
    children: [
      {
        title: '运费',
        dataIndex: 'metTransportPrice',
        valueType: 'digit',
      },
      {
        title: '杂费',
        dataIndex: 'metSundryPrice',
        valueType: 'digit',
      },
      {
        title: '运杂费',
        dataIndex: 'metTraPrice',
        valueType: 'digit',
      },
    ],
  },
  {
    title: '含税',
    children: [
      {
        title: '运费',
        dataIndex: 'metTransportPriceTax',
        valueType: 'digit',
      },
      {
        title: '杂费',
        dataIndex: 'metSundryPriceTax',
        valueType: 'digit',
      },
      {
        title: '运杂费',
        dataIndex: 'metTraPriceTax',
        valueType: 'digit',
      },
    ],
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
