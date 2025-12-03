/*
 * @Author: SHUANG
 * @Date: 2023-05-04 16:52:54
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-10-31 09:20:40
 * @Description:
 */

import { sysNewsQueryOne } from '../services';
import { FormColumnsDefine } from '../../../../../components/BaseSchemaForm/typings';
import RichTextFormItem from '../../../../../components/RichTextFormItem';

import { ENUUMNEWSTYPE } from '../../../../constant/valueEnum';
import VERIFICATION from '../../../../constant/verification';

import { BulletinListItem } from '../typings';

export default (formType?: SYS.FormType) => {
  /** menu schema */
  const columns: FormColumnsDefine<BulletinListItem> = [
    {
      dataIndex: 'id',
      hideInForm: true,
    },
    {
      title: '公告类型',
      dataIndex: 'newsType',
      valueType: 'radio',
      valueEnum: ENUUMNEWSTYPE,
      formItemProps: { rules: VERIFICATION.required },
    },
    {
      title: '组织机构',
      dataIndex: 'selectOrgIds',
      // dependencies: ['newsType'],
      formItemProps: (form) => {
        // if (form.getFieldValue('newsType') === 'PRIVATE')
        //   return { rules: VERIFICATION.required };
        // else return { hidden: true };
        return { hidden: true };
      },
    },
    {
      title: '公告标题',
      dataIndex: 'title',
      valueType: 'textarea',
      colProps: { span: 24 },
      customFieldProps: { placeholder: '', rows: 1 },
      formItemProps: { rules: VERIFICATION.required },
    },
    {
      title: '创建人',
      dataIndex: 'createMan',
      customFieldProps: { disabled: true },
    },
    {
      title: '创建时间',
      dataIndex: 'createDatetime',
      customFieldProps: { disabled: true },
    },
    {
      title: '修改人',
      dataIndex: 'updateMan',
      customFieldProps: { disabled: true },
    },
    {
      title: '修改时间',
      dataIndex: 'updateDatetime',
      customFieldProps: { disabled: true },
    },
    {
      title: '公告内容',
      dataIndex: 'content',
      renderFormItem: (_, v, form) => (
        <RichTextFormItem
          richTextQuery={sysNewsQueryOne}
          id={form?.getFieldValue('id')}
          disable={!formType}
        />
      ),
      colProps: { span: 24 },
    },
  ];

  if (!formType)
    return columns.map((item) => ({
      ...item,
      customFieldProps: { ...item.customFieldProps, disabled: true },
    }));
  return columns;
};
