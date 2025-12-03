/*
 * @Author: SHUANG
 * @Date: 2024-02-22 09:44:50
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-02-22 10:15:17
 * @Description: 取费模板库
 */

import { FormColumnsDefine } from 'jd-framework-web/package/components';
import VERIFICATION from '@/common/constant/verification';

import { valueEnumsRequest } from './valueEnums';
import { DbFeeDatabaseItem } from './typings';

const columns: FormColumnsDefine<DbFeeDatabaseItem> = [
  {
    dataIndex: 'id',
    hideInForm: true,
  },
  {
    title: '取费编码',
    dataIndex: 'feeCode',
    formItemProps: { rules: VERIFICATION.required },
  },
  {
    title: '取费名称',
    dataIndex: 'feeName',
    formItemProps: { rules: VERIFICATION.required },
  },

  {
    title: '阶段',
    dataIndex: 'feePhase',
    valueType: 'select',
    formItemProps: { rules: VERIFICATION.required },
    request: async () => valueEnumsRequest('PHASE'),
    customFieldProps: { fieldNames: { label: 'label', value: 'label' } },
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
    dataIndex: 'feeNote',
    valueType: 'textarea',
  },
];

export default columns;
