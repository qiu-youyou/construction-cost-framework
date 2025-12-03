/*
 * @Author: SHUANG
 * @Date: 2022-07-06 15:49:31
 * @LastEditors: 2470381299@qq.com
 * @LastEditTime: 2024-04-15 11:51:35
 * @Description:
 */
import { FormColumnsDefine } from '../../../../components/BaseSchemaForm/typings';
import { queryDictItemByClassCode } from '../../../services/system';
import VERIFICATION from '../../../constant/verification';
import { ENUMSHOW } from '../../../constant/valueEnum';

import { OrgActionItem } from './typings';

// const DictRes = await queryDictItemByClassCode(['ORG_TYPE']);
// const DictItem = DictRes?.rows;

/** org schema */

export default (type: 'plus' | 'edit') => {
  const orgFormColumns: FormColumnsDefine<OrgActionItem> = [
    {
      dataIndex: 'parentId',
      hideInForm: true,
    },
    {
      dataIndex: 'id',
      hideInForm: true,
    },
    {
      title: '机构名称',
      dataIndex: 'orgName',
      formItemProps: { rules: VERIFICATION.required },
    },
    {
      title: '机构编码',
      dataIndex: 'orgCode',
      customFieldProps: { disabled: type === 'edit' },
    },
    {
      title: '机构类型',
      dataIndex: 'orgType',
      valueType: 'select',
      formItemProps: { rules: VERIFICATION.required },
      request: async () => {
        const res = await queryDictItemByClassCode(['ORG_TYPE']);
        return res?.rows?.ORG_TYPE;
      },
    },
    {
      title: '显示顺序',
      dataIndex: 'billSort',
    },
    {
      title: '简称',
      dataIndex: 'simplesName',
    },
    // {
    //   title: '是否显示',
    //   dataIndex: 'menuShow',
    //   valueType: 'radio',
    //   tooltip: '该节点是否显示于系统菜单中',
    //   initialValue: '显示',
    //   valueEnum: ENUMSHOW,
    // },
  ];

  return orgFormColumns;
};
