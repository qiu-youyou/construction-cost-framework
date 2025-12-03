/*
 * @Author: SHUANG
 * @Date: 2024-04-08 15:43:34
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-08 17:14:34
 * @Description: 树形字典目录
 */
import { FormColumnsDefine } from '../../../../../components/BaseSchemaForm/typings';
import VERIFICATION from '../../../../../common/constant/verification';
import { DictTreeClassItem } from '../typings';

const columns: FormColumnsDefine<DictTreeClassItem> = [
  {
    dataIndex: 'id',
    hideInForm: true,
  },
  {
    title: '目录编码',
    dataIndex: 'classEn',
    formItemProps: { rules: VERIFICATION.required },
  },
  {
    title: '目录名称',
    dataIndex: 'className',
    formItemProps: { rules: VERIFICATION.required },
  },
  {
    title: '顺序',
    dataIndex: 'billSort',
    valueType: 'digit',
  },
  {
    title: '备注',
    dataIndex: 'classRemarks',
    valueType: 'digit',
  },
];

export default columns;
