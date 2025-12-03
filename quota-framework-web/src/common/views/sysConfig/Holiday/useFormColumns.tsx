/*
 * @Author: SHUANG
 * @Date: 2023-08-15 14:09:28
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-10-13 15:55:00
 * @Description:
 */
import { FormColumnsDefine } from '../../../../components/BaseSchemaForm/typings';
import VERIFICATION from '../../../constant/verification';
import { ENUMWORKDAY } from '../../../constant/valueEnum';
import { HolidayListItem } from './typings';

const columns: FormColumnsDefine<HolidayListItem> = [
  {
    dataIndex: 'id',
    hideInForm: true,
  },
  {
    title: '类型',
    dataIndex: 'workDay',
    valueType: 'radio',
    valueEnum: ENUMWORKDAY,
    formItemProps: { rules: VERIFICATION.required },
  },
  {
    title: '日期',
    dataIndex: 'holidayDate',
    valueType: 'date',
    formItemProps: { rules: VERIFICATION.required },
  },
  {
    title: '描述',
    dataIndex: 'info',
    valueType: 'textarea',
    formItemProps: { rules: VERIFICATION.required },
  },
  {
    title: '顺序',
    dataIndex: 'billSort',
    valueType: 'digit',
  },
];

export default columns;
