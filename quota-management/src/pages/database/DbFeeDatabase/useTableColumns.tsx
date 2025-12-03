/*
 * @Author: SHUANG
 * @Date: 2024-02-22 09:31:25
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-02-22 11:58:12
 * @Description: 取费模板库
 */

import { TableColumnsDefine } from 'jd-framework-web/package/components';
import { valueEnumsRequest } from './valueEnums';
import { DbFeeDatabaseItem } from './typings';

const columns: TableColumnsDefine<DbFeeDatabaseItem> = [
  {
    title: '序号',
    dataIndex: 'index',
    align: 'center',
    width: 50,
  },
  {
    title: '取费编码',
    dataIndex: 'feeCode',
    align: 'center',
    cellEdit: true,
    width: 130,
  },
  {
    title: '取费名称',
    dataIndex: 'feeName',
    valueType: 'textarea',
    cellEdit: true,
  },

  {
    title: '阶段',
    dataIndex: 'feePhase',
    valueType: 'select',
    cellEdit: true,
    align: 'center',
    width: 90,
    request: async () => valueEnumsRequest('PHASE'),
    customFieldProps: { fieldNames: { label: 'label', value: 'label' } },
  },
  {
    title: '行业',
    dataIndex: 'dbIndustryName',
    valueType: 'select',
    cellEdit: true,
    align: 'center',
    width: 90,
    request: async () => valueEnumsRequest('PROFESSION'),
    customFieldProps: { fieldNames: { label: 'label', value: 'label' } },
  },
  {
    title: '备注',
    dataIndex: 'feeNote',
    valueType: 'textarea',
    cellEdit: true,
  },
];

export default columns;
