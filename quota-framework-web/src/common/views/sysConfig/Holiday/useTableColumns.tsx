/*
 * @Author: SHUANG
 * @Date: 2023-07-26 13:51:11
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-10-16 09:55:27
 * @Description:
 */
import { TableColumnsDefine } from '../../../../components/BaseTable/typings';
import RadioGroupButton from '../../../../components/RadioGroupButton';
import PickerWithType from './PickerWithType';

import { ENUMBILLSTATUS, ENUMWORKDAY } from '../../../constant/valueEnum';
import StatusText from '../../../textTag/StatusText';

import { HolidayListItem } from './typings';

const columns: TableColumnsDefine<HolidayListItem> = [
  { dataIndex: 'index', width: 30 },
  {
    title: '类型',
    dataIndex: 'workDay',
    valueType: 'radioButton',
    valueEnum: ENUMWORKDAY,
    renderFormItem: ({ valueEnum }) => <RadioGroupButton valueEnum={valueEnum} />,
    width: 80,
  },
  // {
  //   title: '日期',
  //   dataIndex: 'holidayDate',
  // },
  {
    title: '日期',
    dataIndex: 'holidayDate',
    valueType: 'date',
    renderFormItem: () => <PickerWithType />,
  },
  {
    title: '描述',
    dataIndex: 'info',
  },
  {
    title: '创建人',
    dataIndex: 'createMan',
    align: 'center',

    search: false,
    width: 80,
  },
  {
    title: '创建时间',
    dataIndex: 'createDatetime',
    align: 'center',

    search: false,
    width: 90,
  },
  {
    title: '修改人',
    dataIndex: 'updateMan',
    align: 'center',

    search: false,
    width: 80,
  },
  {
    title: '修改时间',
    dataIndex: 'updateDatetime',
    align: 'center',

    search: false,
    width: 90,
  },
  {
    title: '状态',
    dataIndex: 'billStatus',
    valueType: 'select',
    valueEnum: ENUMBILLSTATUS,
    customRender: (_, { billStatus }) => <StatusText status={billStatus} />,
    customFieldProps: { showSearch: true },
    search: false,
    width: 40,
  },
];

export default columns;
