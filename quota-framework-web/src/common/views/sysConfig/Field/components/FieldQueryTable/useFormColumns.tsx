/*
 * @Author: SHUANG
 * @Date: 2023-08-01 11:44:45
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-10-13 15:56:18
 * @Description: 自定义查询表单
 */
import { FormColumnsDefine } from '../../../../../../components/BaseSchemaForm/typings';
import VERIFICATION from '../../../../../constant/verification';
import { ENUMFIELDTYPE } from '../../../../../constant/valueEnum';
import { FieldQueryListItem } from '../../typings';

const columns: FormColumnsDefine<FieldQueryListItem> = [
  {
    dataIndex: 'id',
    hideInForm: true,
  },
  {
    dataIndex: 'businessId',
    hideInForm: true,
  },
  {
    title: '查询字段',
    dataIndex: 'fieldName',
    formItemProps: { rules: VERIFICATION.required },
  },
  {
    title: '字段描述',
    dataIndex: 'fieldNameEn',
    formItemProps: { rules: VERIFICATION.required },
  },
  {
    title: '字段类型',
    dataIndex: 'fieldType',
    valueType: 'select',
    valueEnum: ENUMFIELDTYPE,
    formItemProps: { rules: VERIFICATION.required },
  },
  {
    title: '数值系数',
    dataIndex: 'fieldNumberRate',
  },
  {
    title: '顺序',
    valueType: 'digit',
    dataIndex: 'billSort',
  },
];

export default columns;
