/*
 * @Author: SHUANG
 * @Date: 2023-07-27 10:33:51
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-07-27 21:29:05
 * @Description:
 */

import { TableColumnsDefine } from '@/components/BaseTable/typings';

const columns: TableColumnsDefine<any> = [
  { dataIndex: 'index' },
  {
    title: '文字',
    dataIndex: 'testText',
    cellEdit: true,
    width: 160,
  },
  {
    title: '下拉选择',
    dataIndex: 'testSelect',
    valueType: 'select',
    valueEnum: {
      选项1: { text: '选项1' },
      选项2: { text: '选项2' },
      选项3: { text: '选项3' },
    },
    cellEdit: true,

    width: 120,
  },
  {
    title: '数值',
    dataIndex: 'testDigit',
    valueType: 'digit',
    cellEdit: true,
  },
  {
    title: '文本',
    dataIndex: 'testTextarea',
    valueType: 'textarea',
    cellEdit: true,
  },
  {
    title: '日期',
    dataIndex: 'testDate',
    valueType: 'date',
    cellEdit: true,
  },
  {
    title: '日期年',
    dataIndex: 'testYear',
    valueType: 'dateYear',
    cellEdit: true,
  },
  {
    title: '多级表头',
    cellEdit: true,
    children: [
      {
        title: '文字',
        dataIndex: 'testTextChil',
        cellEdit: true,
        width: 160,
      },
      {
        title: '下拉选择',
        dataIndex: 'testSelectChil',
        valueType: 'select',
        valueEnum: {
          选项1: { text: '选项1' },
          选项2: { text: '选项2' },
          选项3: { text: '选项3' },
        },
        cellEdit: true,
        width: 120,
      },
      {
        title: '数值',
        dataIndex: 'testDigitChil',
        valueType: 'digit',
        cellEdit: true,
      },
      {
        title: '文本',
        dataIndex: 'testTextareaChil',
        valueType: 'textarea',
        cellEdit: true,
      },
      {
        title: '日期',
        dataIndex: 'testDateChil',
        valueType: 'date',
        cellEdit: true,
      },
      {
        title: '日期年',
        dataIndex: 'testYearChil',
        valueType: 'dateYear',
        cellEdit: true,
      },
    ],
  },
];

export default columns;
