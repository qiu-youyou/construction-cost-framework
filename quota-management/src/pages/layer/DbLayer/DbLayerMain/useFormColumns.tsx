/*
 * @Author: SHUANG
 * @Date: 2023-11-17 15:17:26
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-03-26 14:05:18
 * @Description: 全费用定额测算
 */

import { FormColumnsDefine } from 'jd-framework-web/package/components';
import VERIFICATION from 'jd-framework-web/package/common/constant/verification';

import { databaseDbQueryPageInfo } from '@/pages/database/DbMain/DatabaseMain/services';
import { DbLayerItem } from './typings';

export default (type: 'plus' | 'edit') => {
  const columns: FormColumnsDefine<DbLayerItem> = [
    {
      dataIndex: 'id',
      hideInForm: true,
    },
    {
      title: '定额库',
      dataIndex: 'dbId',
      valueType: 'select',
      formItemProps: { rules: VERIFICATION.required },
      request: async () => {
        const res = await databaseDbQueryPageInfo({});
        return res?.rows;
      },
      customFieldProps: {
        fieldNames: { label: 'dbName', value: 'id' },
        disabled: type === 'edit',
      },
    },
    {
      title: '层级名称',
      dataIndex: 'layerName',
      formItemProps: { rules: VERIFICATION.required },
    },
  ];

  return columns;
};
