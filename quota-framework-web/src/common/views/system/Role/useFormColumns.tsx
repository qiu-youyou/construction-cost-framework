/*
 * @Author: SHUANG
 * @Date: 2023-07-11 16:10:24
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-10-24 13:41:22
 * @Description:
 */
import { FormColumnsDefine } from '../../../../components/BaseSchemaForm/typings';
import VERIFICATION from '../../../constant/verification';
import { RoleActionItem } from './typings';

/** menu button schema */
const columns: FormColumnsDefine<RoleActionItem> = [
  {
    dataIndex: 'id',
    hideInForm: true,
  },
  {
    title: '角色名称',
    dataIndex: 'roleName',
    formItemProps: { rules: VERIFICATION.required },
  },
  {
    title: '角色编码',
    dataIndex: 'roleCode',
    formItemProps: { rules: VERIFICATION.required },
  },
  {
    title: '角色类型',
    dataIndex: 'roleType',
    valueType: 'select',
    customFieldProps: {
      options: [
        { value: 3, label: '流程角色' },
        { value: 4, label: '系统角色' },
        { value: 0, label: '普通角色' },
      ],
    },
  },
  {
    title: '角色描述',
    dataIndex: 'roleRemarks',
    valueType: 'textarea',
  },
];

export default columns;
