/*
 * @Author: SHUANG
 * @Date: 2022-07-06 15:49:31
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-10-24 13:41:32
 * @Description:
 */
import { FormColumnsDefine } from '../../../../components/BaseSchemaForm/typings';
import { ENUMIDCARDTYPE, ENUMISSWITCH, ENUMUSERSEX } from '../../../constant/valueEnum';
import ChooseProduction from '../../../formItems/ChooseProduction';
import VERIFICATION from '../../../constant/verification';

import { orgcodegroupQueryOption } from '../Region/services';
import { UserActionItem } from './typings';

/** menu button schema */
const columns: FormColumnsDefine<UserActionItem> = [
  {
    dataIndex: 'id',
    hideInForm: true,
  },
  {
    title: '用户名',
    dataIndex: 'userName',
    formItemProps: { rules: VERIFICATION.required },
  },
  {
    title: '真实姓名',
    dataIndex: 'userRealname',
    formItemProps: { rules: VERIFICATION.required },
  },
  {
    title: '性别',
    dataIndex: 'userSex',
    valueType: 'select',
    valueEnum: ENUMUSERSEX,
  },
  {
    title: '年龄',
    dataIndex: 'userAge',
    valueType: 'digit',
  },
  {
    title: '用户电话',
    dataIndex: 'userPhone',
  },
  {
    title: '办公电话',
    dataIndex: 'userOfficePhone',
  },
  {
    title: '用户邮箱',
    dataIndex: 'userEmail',
  },
  {
    title: '证件类型',
    dataIndex: 'userCertificateType',
    valueType: 'select',
    valueEnum: ENUMIDCARDTYPE,
  },
  {
    title: '证件号码',
    dataIndex: 'userCertificateNumber',
  },
  {
    title: '用户开始使用时间',
    dataIndex: 'userMinDate',
    valueType: 'date',
  },
  {
    title: '用户最大有效期',
    dataIndex: 'userMaxDate',
    valueType: 'date',
  },
  {
    dataIndex: 'areaName',
    formItemProps: { hidden: true },
    customFieldProps: { disabled: true },
    colProps: { span: 0 },
  },
  {
    title: '区域',
    dataIndex: 'areaCode',
    valueType: 'select',
    request: async () => (await orgcodegroupQueryOption())?.rows,
    customFieldProps: (form) => ({
      onChange: (_: unknown, item: { label: string }) => {
        form?.setFieldsValue?.({ areaName: item?.label });
        if (!item?.label) {
          form?.setFieldsValue?.({ areaName: '', areaCode: '' });
        }
      },
    }),
  },
  {
    title: '是否启用签名',
    dataIndex: 'autographEnbale',
    valueType: 'select',
    valueEnum: ENUMISSWITCH,
  },
  {
    title: '用户描述',
    dataIndex: 'remarks',
    valueType: 'textarea',
    customFieldProps: { rows: 1 },
  },
  {
    colProps: { span: 24, prefixCls: 'layout-col' },
    renderFormItem: (_, v, form) => <ChooseProduction id={form?.getFieldValue('id')} />,
  },
];

export default () => columns;
