/*
 * @Author: SHUANG
 * @Date: 2023-10-26 16:31:26
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-22 15:03:26
 * @Description: 定额库表单配置
 */
import { FormColumnsDefine } from 'jd-framework-web/package/components';
import VERIFICATION from '@/common/constant/verification';

import { valueEnumsRequest } from './valueEnums';
import { DatabaseDbItem } from './typings';

const columns: FormColumnsDefine<DatabaseDbItem> = [
  {
    dataIndex: 'id',
    hideInForm: true,
  },
  {
    title: '定额库编码',
    dataIndex: 'dbCode',
    formItemProps: { rules: VERIFICATION.required },
  },
  {
    title: '定额库名称',
    dataIndex: 'dbName',
    formItemProps: { rules: VERIFICATION.required },
  },
  {
    title: '定额库简称',
    dataIndex: 'dbSimple',
    formItemProps: { rules: VERIFICATION.required },
  },
  {
    dataIndex: 'dbIndustryName',
    formItemProps: { hidden: true },
    fieldProps: { disabled: true },
    colProps: { span: 0 },
  },
  {
    title: '行业',
    dataIndex: 'dbIndustryCode',
    valueType: 'select',
    formItemProps: { rules: VERIFICATION.required },
    request: async () => valueEnumsRequest('PROFESSION'),
    customFieldProps: (form) => ({
      onChange: (_: unknown, item: { label: string }) => {
        form?.setFieldValue?.('dbIndustryName', item?.label || '');
      },
    }),
  },
  {
    title: '备注',
    dataIndex: 'dbNote',
    valueType: 'textarea',
  },
];

export default columns;
