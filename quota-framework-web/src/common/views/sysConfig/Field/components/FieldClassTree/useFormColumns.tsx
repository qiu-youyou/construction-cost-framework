/*
 * @Author: SHUANG
 * @Date: 2023-08-01 11:44:45
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-10-24 11:53:56
 * @Description: 自定义目录管理 表单
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
    title: '业务KEY',
    dataIndex: 'businessKey',
    formItemProps: { rules: VERIFICATION.required },
  },
  {
    title: '业务描述',
    dataIndex: 'businessName',
    formItemProps: { rules: VERIFICATION.required },
  },
  {
    title: '表名',
    dataIndex: 'businessTable',
    formItemProps: { rules: VERIFICATION.required },
  },
  {
    title: '顺序',
    dataIndex: 'billSort',
    valueType: 'digit',
  },
];

export default columns;
