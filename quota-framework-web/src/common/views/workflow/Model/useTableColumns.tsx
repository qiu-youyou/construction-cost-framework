/*
 * @Author: SHUANG
 * @Date: 2022-08-18 11:28:15
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-10-16 14:06:52
 * @Description:
 */

import { TableColumnsDefine } from '../../../../components/BaseTable/typings';
import { ModelListItem } from './typings';
import { Tag } from 'antd';

export default (optionsData?: { business?: any; org?: any; businessEnum?: any; orgEnum?: any }) => {
  const columns: TableColumnsDefine<ModelListItem> = [
    {
      title: '模型名称',
      dataIndex: 'name',
      align: 'center',
    },
    {
      title: '业务类型',
      dataIndex: 'categoryLike',
      valueType: 'select',
      customFieldProps: {
        fieldNames: { label: 'businessName', value: 'businessName' },
        options: optionsData?.business,
        showSearch: true,
      },
      hideInTable: true,
    },
    {
      title: '业务类型',
      dataIndex: 'category',
      valueType: 'select',

      valueEnum: optionsData?.businessEnum,
      customFieldProps: { showSearch: true },
      search: false,
    },
    {
      title: '公司',
      dataIndex: 'companyId',
      valueType: 'select',
      customFieldProps: {
        fieldNames: { label: 'orgName', value: 'id' },
        options: optionsData?.org,
        showSearch: true,
      },
      valueEnum: optionsData?.orgEnum,
    },

    {
      title: '生产装置',
      dataIndex: 'companyFactoryId',
      valueType: 'select',
      hideInTable: true,
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
      title: '生产装置',
      dataIndex: 'companyFactoryName',
      valueType: 'select',
      search: false,
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
      title: '创建时间',
      dataIndex: 'createTime',
      align: 'center',

      search: false,
      width: 55,
    },
    {
      title: '最后修改时间',
      dataIndex: 'lastUpdateTime',
      align: 'center',
      search: false,
      width: 55,
    },

    {
      title: '状态',
      dataIndex: 'status',
      valueType: 'select',
      search: false,
      width: 40,
      customRender: (_, { deploymentId }) => {
        if (deploymentId) return <Tag className="tagSuccess">已部署</Tag>;
        else return <Tag className="tagDefault">未部署</Tag>;
      },
      customFieldProps: { showSearch: true },
    },
  ];
  return columns;
};
