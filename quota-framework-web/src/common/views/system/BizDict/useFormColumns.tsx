/*
 * @Author: SHUANG
 * @Date: 2022-08-17 15:50:35
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-10-31 09:34:55
 * @Description:
 */
import { FormColumnsDefine } from '../../../../components/BaseSchemaForm/typings';
import VERIFICATION from '../../../constant/verification';
import { BusinessDictListItem } from './typings';

/** dictClass schema */
const columns: FormColumnsDefine<BusinessDictListItem> = [
  {
    dataIndex: 'id',
    hideInForm: true,
  },
  {
    title: '业务字典名称',
    dataIndex: 'businessName',
    formItemProps: { rules: VERIFICATION.required },
  },
  {
    title: '业务描述',
    dataIndex: 'description',
  },
  {
    title: '默认规则',
    dataIndex: 'defaultRule',
  },
  {
    title: '工作流 KEY',
    dataIndex: 'workflowKey',
  },
  {
    title: '工作流开启页面 URL',
    dataIndex: 'workflowFormUrl',
  },
  {
    title: '排序',
    dataIndex: 'billSort',
    valueType: 'digit',
  },
];

export default columns;
