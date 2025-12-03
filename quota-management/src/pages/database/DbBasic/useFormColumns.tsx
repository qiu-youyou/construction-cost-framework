/*
 * @Author: SHUANG
 * @Date: 2024-02-29 14:10:09
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-02-29 17:49:27
 * @Description: 基础企业定额
 */

import { FormColumnsDefine } from 'jd-framework-web/package/components';
import VERIFICATION from 'jd-framework-web/package/common/constant/verification';
import { DatabaseDbItem } from '../DbMain/DatabaseMain/typings';
import DatabaseSelect from '@/common/formItems/DatabaseSelect';
import { BasicDatabaseDbItem } from './typings';

const columns: FormColumnsDefine<BasicDatabaseDbItem> = [
  {
    dataIndex: 'id',
    hideInForm: true,
  },

  {
    dataIndex: 'dbCode',
    formItemProps: { hidden: true },
    fieldProps: { disabled: true },
    colProps: { span: 0 },
  },
  {
    dataIndex: 'dbName',
    formItemProps: { hidden: true },
    fieldProps: { disabled: true },
    colProps: { span: 0 },
  },
  {
    title: '选择定额库',
    dataIndex: 'dbId',
    formItemProps: { rules: VERIFICATION.required },
    renderFormItem(schema, config, form) {
      return <DatabaseSelect />;
    },
    customFieldProps: (form) => ({
      onChange: (v: string, databaseCurrent?: DatabaseDbItem) => {
        /** 更新当前表单 */
        const dbId = databaseCurrent?.id || '';
        const dbCode = databaseCurrent?.dbCode || '';
        const dbName = databaseCurrent?.dbName || '';
        form?.setFieldsValue?.({ dbId, dbCode, dbName });
      },
    }),
  },

  {
    title: '描述',
    dataIndex: 'describe',
    valueType: 'textarea',
    customFieldProps: { rows: 4, style: { height: 'auto' } },
  },
];
export default columns;
