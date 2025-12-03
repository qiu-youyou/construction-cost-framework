/*
 * @Author: SHUANG
 * @Date: 2023-07-24 09:44:18
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-10-13 15:56:35
 * @Description:
 */
import { FormColumnsDefine } from '../../../../components/BaseSchemaForm/typings';
import VERIFICATION from '../../../constant/verification';
import { SysConfigListItem } from './typings';

const columns: FormColumnsDefine<SysConfigListItem> = [
  {
    dataIndex: 'id',
    hideInForm: true,
  },
  {
    title: '配置名',
    dataIndex: 'configTitle',
    formItemProps: { rules: VERIFICATION.required },
  },
  {
    title: '配置Key',
    dataIndex: 'configKey',
    customFieldProps: { disabled: true },
    formItemProps: { rules: VERIFICATION.required },
  },
  {
    title: '配置值',
    dataIndex: 'configValue',
    formItemProps: { rules: VERIFICATION.required },
  },
  {
    title: '顺序',
    dataIndex: 'billSort',
    valueType: 'digit',
  },
];

export default columns;
