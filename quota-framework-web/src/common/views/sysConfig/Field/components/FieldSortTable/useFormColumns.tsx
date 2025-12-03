/*
 * @Author: SHUANG
 * @Date: 2023-08-01 11:44:45
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-10-24 11:55:11
 * @Description: 自定义排序表单
 */
import { FormColumnsDefine } from '../../../../../../components/BaseSchemaForm/typings';
import VERIFICATION from '../../../../../constant/verification';
import { FieldSortListItem } from '../../typings';

const columns: FormColumnsDefine<FieldSortListItem> = [
  {
    dataIndex: 'id',
    hideInForm: true,
  },
  {
    dataIndex: 'businessId',
    hideInForm: true,
  },
  {
    title: '排序字段',
    dataIndex: 'fieldName',
    formItemProps: { rules: VERIFICATION.required },
  },
  {
    title: '字段描述',
    dataIndex: 'fieldNameEn',
    formItemProps: { rules: VERIFICATION.required },
  },
  {
    title: '顺序',
    valueType: 'digit',
    dataIndex: 'billSort',
  },
];

export default columns;
