/*
 * @Author: SHUANG
 * @Date: 2024-04-11 10:14:31
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-15 17:42:04
 * @Description: 工程造价-运保杂费计算 来源地
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
    title: '来源地名称',
    dataIndex: 'oriName',
    cellEdit: true,
    width: 180,
  },
  {
    title: '交货比例(%)',
    dataIndex: 'oriDeliveryRate',
    valueType: 'digit',
    cellEdit: true,
  },
  {
    title: '交货条件',
    dataIndex: 'oriDeliveryCondition',
    cellEdit: true,
  },
  {
    title: '交货地点',
    dataIndex: 'oriDeliveryPlace',
    align: 'center',
    cellEdit: true,
  },
  {
    title: '运杂费',
    children: [
      {
        title: '除税',
        dataIndex: 'oriTraPrice',
        valueType: 'digit',
      },
      {
        title: '含税',
        dataIndex: 'oriTraPriceTax',
        valueType: 'digit',
      },
    ],
  },

  {
    title: '货物等级',
    children: [
      {
        title: '火车',
        dataIndex: 'oriTrainGrade',
        valueType: 'digit',
        cellEdit: true,
      },
      {
        title: '汽车',
        dataIndex: 'oriCarGrade',
        valueType: 'digit',
        cellEdit: true,
      },
      {
        title: '船运',
        dataIndex: 'oriBoatGrade',
        valueType: 'digit',
        cellEdit: true,
      },
    ],
  },

  {
    title: '装载系数',
    children: [
      {
        title: '火车',
        dataIndex: 'oriTrainRate',
        valueType: 'digit',
        cellEdit: true,
      },
      {
        title: '汽车',
        dataIndex: 'oriCarRate',
        valueType: 'digit',
        cellEdit: true,
      },
      {
        title: '船运',
        dataIndex: 'oriBoatRate',
        valueType: 'digit',
        cellEdit: true,
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
