/*
 * @Author: SHUANG
 * @Date: 2022-08-18 11:28:15
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-10-24 12:01:59
 * @Description:
 */
import { FormColumnsDefine } from '../../../../components/BaseSchemaForm/typings';
import UploadInput from '../../../../components/UploadInput';
import VERIFICATION from '../../../constant/verification';
import { ModelActionItem } from './typings';

export default (optionsData?: { business?: any; org?: any }) => {
  /** menu button schema */
  const createModelColumns: FormColumnsDefine<ModelActionItem> = [
    {
      title: '名称',
      dataIndex: 'name',
      formItemProps: { rules: VERIFICATION.required },
    },
    {
      title: '业务类型',
      dataIndex: 'category',
      formItemProps: { rules: VERIFICATION.required },
      valueType: 'select',
      customFieldProps: {
        fieldNames: { label: 'businessName', value: 'workflowKey' },
        options: optionsData?.business,
        showSearch: true,
      },
    },
    {
      title: '公司',
      dataIndex: 'companyId',
      valueType: 'select',
      customFieldProps: {
        fieldNames: { label: 'orgName', value: 'id' },
        options: optionsData?.org?.map((item: any) => {
          const newItem = { ...item };
          delete newItem.children;
          return { ...newItem };
        }),
        showSearch: true,
      },
    },
    {
      title: '生产装置',
      dataIndex: 'companyFactoryId',
      valueType: 'select',
      dependencies: ['companyId'],
      customFieldProps: (form) => {
        if (!form) return;
        const companyId = form?.getFieldValue('companyId');
        if (!companyId) return { value: null };
        const options = optionsData?.org.filter((item: any) => item.id === companyId)?.[0]?.children;
        if (!options?.length) return { value: null };
        return {
          showSearch: true,
          fieldNames: { label: 'orgName', value: 'id' },
          options,
        };
      },
    },
    {
      title: '描述',
      dataIndex: 'description',
      valueType: 'textarea',
    },
  ];

  const importModelColumns: FormColumnsDefine<ModelActionItem> = [
    ...createModelColumns,
    {
      title: '模型文件',
      dataIndex: 'file',
      renderFormItem: () => <UploadInput />,
      formItemProps: { rules: VERIFICATION.required },
    },
  ];

  return {
    createModelColumns,
    importModelColumns,
  };
};
