/*
 * @Author: SHUANG
 * @Date: 2023-08-14 17:25:49
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-12-28 17:04:43
 * @Description:
 */
import { useModel } from 'umi';
import { FormColumnsDefine } from '../../../../../components/BaseSchemaForm/typings';
import RichTextFormItem from '../../../../../components/RichTextFormItem';

import VERIFICATION from '../../../../constant/verification';

import ChooseAssignPersonnel from './ChooseAssignPersonnel';
import { sysWorkQueryOne, valueEnumsRequest } from '../services';
import { UserListItem } from '../../User/typings';
import { WorkListItem } from '../typings';

type Props = { formType: SYS.FormType };

export default ({ formType }: Props) => {
  const { initialState } = useModel('@@initialState');

  /** 递归处理菜单数据 */
  const handleMenuData = (arr?: any[]) => {
    return arr?.map((item: any) => {
      if (item?.children?.length) {
        const children: any = handleMenuData(item.children);
        return { ...item, disabled: true, children, key: item?.name + item?.path };
      }
      return { ...item, key: item?.name + item?.path };
    });
  };

  const menuDataOptions = handleMenuData(initialState?.menuData);

  const columns: FormColumnsDefine<WorkListItem> = [
    {
      dataIndex: 'id',
      formItemProps: { hidden: true },
      colProps: { span: 0 },
    },
    {
      title: '工单编号',
      dataIndex: 'billNo',
      customFieldProps: { disabled: true },
    },
    {
      title: '工单名称',
      dataIndex: 'billName',
      formItemProps: { rules: VERIFICATION.required },
    },
    {
      title: '提报人',
      dataIndex: 'submitter',
      customFieldProps: { disabled: true },
    },
    {
      title: '提报部门',
      dataIndex: 'createDeptName',
      customFieldProps: { disabled: true },
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      formItemProps: { rules: VERIFICATION.required },
    },
    {
      title: '联系电话',
      dataIndex: 'phone',
      formItemProps: { rules: VERIFICATION.required },
    },

    {
      dataIndex: 'bizType',
      formItemProps: { hidden: true },
      customFieldProps: { disabled: true },
      colProps: { span: 0 },
    },
    {
      title: '业务类型',
      dataIndex: 'bizTypeCode',
      valueType: 'select',
      request: async () => valueEnumsRequest('BIZ_TYPE'),
      customFieldProps: (form) => ({
        onChange: (_: unknown, item: { label: string }) => form?.setFieldsValue?.({ bizType: item?.label }),
        showSearch: true,
      }),
    },

    {
      title: '系统模块',
      dataIndex: 'systemModule',
      valueType: 'treeSelect',
      customFieldProps: {
        options: menuDataOptions,
        fieldNames: { label: 'name', value: 'key' },
        allowClear: true,
      },
    },

    {
      dataIndex: 'assignPersonnelCode',
      formItemProps: { hidden: true },
      customFieldProps: { disabled: true },
      colProps: { span: 0 },
    },
    {
      title: '指派人员',
      dataIndex: 'assignPersonnel',
      formItemProps: { rules: VERIFICATION.required },
      renderFormItem: () => <ChooseAssignPersonnel />,
      customFieldProps: (form) => ({
        onChange: (value: string, item: UserListItem) => {
          form?.setFieldsValue?.({ assignPersonnelCode: item?.userName });
        },
      }),
    },

    {
      dataIndex: 'workStatus',
      formItemProps: { hidden: true },
      customFieldProps: { disabled: true },
      colProps: { span: 0 },
    },
    {
      title: '工单状态',
      dataIndex: 'billStatus',
      valueType: 'select',
      request: async () => valueEnumsRequest('WORK_STATUS'),
      customFieldProps: (form) => ({
        onChange: (_: unknown, item: { label: string }) =>
          form?.setFieldsValue?.({ workStatus: item?.label }),
        showSearch: true,
      }),
    },

    {
      title: '创建日期',
      dataIndex: 'createDatetime',
      customFieldProps: { disabled: true },
    },
    {
      title: '公告内容',
      dataIndex: 'problemDesc',
      renderFormItem: (_, v, form) => (
        <RichTextFormItem
          richTextQuery={sysWorkQueryOne}
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
