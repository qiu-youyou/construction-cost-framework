/*
 * @Author: SHUANG
 * @Date: 2022-10-30 18:37:37
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-10-24 12:03:06
 * @Description: 业务信息
 */

import { FormColumnsDefine } from '@/components/BaseSchemaForm/typings';
import { IssueListItem } from '../typings';

const columns: FormColumnsDefine<IssueListItem> = [
  {
    // 自动带出
    title: '发起人',
    dataIndex: 'startPerson',
  },
  {
    // 自动带出·
    title: '发起时间',
    dataIndex: 'startDateTime',
    valueType: 'date',
    customFieldProps: { disabled: true },
  },
  {
    // 自动带出 / 手动填写
    title: '所在单位',
    dataIndex: 'companyName',
  },
  {
    // 自动带出
    title: '联系电话',
    dataIndex: 'phone',
  },

  {
    dataIndex: 'productionBaseName',
    formItemProps: { hidden: true },
    customFieldProps: { disabled: true },
    colProps: { span: 0 },
  },
  {
    title: '公司名称',
    dataIndex: 'productionBaseCode',
    valueType: 'select',
    customFieldProps: (form) => ({
      fieldNames: { label: 'orgName', value: 'orgCode', children: '' },
      showSearch: true,
    }),
    valueEnum: {},
  },

  // 下拉选择
  {
    dataIndex: 'problemTypeName',
    formItemProps: { hidden: true },
    customFieldProps: { disabled: true },
    colProps: { span: 0 },
  },
  {
    title: '问题分类',
    dataIndex: 'problemTypeCode',
    valueType: 'select',
    customFieldProps: (form) => ({
      onChange: (_: unknown, item: { label: string }) =>
        form?.setFieldsValue?.({ problemTypeName: item?.label }),
      showSearch: true,
    }),
    valueEnum: {},
  },

  // 下拉选择
  {
    dataIndex: 'costTypeName',
    formItemProps: { hidden: true },
    customFieldProps: { disabled: true },
    colProps: { span: 0 },
  },
  {
    title: '专业',
    dataIndex: 'costTypeCode',
    valueType: 'select',
    customFieldProps: (form) => ({
      onChange: (_: unknown, item: { label: string }) =>
        form?.setFieldsValue?.({ costTypeName: item?.label }),
      showSearch: true,
    }),
    valueEnum: {},
  },

  // 弹窗选择
  {
    title: '装置代码',
    dataIndex: 'generalFactoryCode',
    // formItemProps: { rules: VERIFICATION.required },
    // renderFormItem: (_) => <ChooseDeviceFormItem />,
    customFieldProps: (form) => ({
      // onChange: (value: string, item) => {
      //
      //   form?.setFieldsValue?.({
      //     generalFactoryName: item?.pltxt,
      //   });
      // },
    }),
  },
  // 自动带出
  {
    title: '生产装置',
    dataIndex: 'generalFactoryName',
    // formItemProps: { rules: VERIFICATION.required },
    customFieldProps: { disabled: true },
  },

  {
    title: '涉及甲方人员',
    dataIndex: 'personName',
    // formItemProps: { rules: VERIFICATION.required },
  },

  {
    dataIndex: 'reconciliationName',
    formItemProps: { hidden: true },
    customFieldProps: { disabled: true },
    colProps: { span: 0 },
  },
  {
    title: '协调环节',
    dataIndex: 'reconciliationCode',
    valueType: 'select',
    // formItemProps: { rules: VERIFICATION.required },
    // request: async () => DictItem.ZDWT_XTHJ,
    customFieldProps: (form) => ({
      onChange: (_: unknown, item: { label: string }) =>
        form?.setFieldsValue?.({ reconciliationName: item?.label }),
      showSearch: true,
    }),
  },

  // 下拉选择
  {
    dataIndex: 'solveName',
    formItemProps: { hidden: true },
    customFieldProps: { disabled: true },
    colProps: { span: 0 },
  },
  {
    title: '是否解决',
    dataIndex: 'solveCode',
    valueType: 'select',
    customFieldProps: (form) => ({
      onChange: (_: unknown, item: { label: string }) => form?.setFieldsValue?.({ solveName: item?.label }),
      showSearch: true,
    }),
    valueEnum: {},
  },

  // 下拉选择
  {
    dataIndex: 'processName',
    formItemProps: { hidden: true },
    customFieldProps: { disabled: true },
    colProps: { span: 0 },
  },
  {
    title: '进程',
    dataIndex: 'processCode',
    valueType: 'select',
    valueEnum: {},
    customFieldProps: (form) => ({
      onChange: (_: unknown, item: { label: string }) => form?.setFieldsValue?.({ processName: item?.label }),
      showSearch: true,
    }),
  },
  {
    title: '数值',
    dataIndex: 'test',
    valueType: 'digit',
  },
  // 手动填写
  {
    title: '问题描述',
    dataIndex: 'issueNode',
    valueType: 'textarea',
    customFieldProps: { rows: 1 },
  },
];

export default () => columns;
