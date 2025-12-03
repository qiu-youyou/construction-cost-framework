/*
 * @Author: SHUANG
 * @Date: 2023-10-17 14:16:19
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-22 15:03:37
 * @Description: 定额库列表配置
 */
import { TableColumnsDefine } from 'jd-framework-web/package/components';
import StatusText from 'jd-framework-web/package/common/textTag/StatusText';
import { ENUMBILLSTATUS } from '@/common/constant/valueEnum';
import { valueEnumsRequest } from './valueEnums';
import { DatabaseDbItem } from './typings';

const columns: TableColumnsDefine<DatabaseDbItem> = [
  {
    title: '序号',
    dataIndex: 'index',
    align: 'center',
    width: 55,
  },
  {
    title: '定额库编码',
    dataIndex: 'dbCode',
    align: 'center',
    cellEdit: true,
    width: 130,
  },
  {
    title: '定额库名称',
    dataIndex: 'dbName',
    valueType: 'textarea',
    cellEdit: true,
  },
  {
    title: '定额库简称',
    dataIndex: 'dbSimple',
    cellEdit: true,
    width: 140,
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
    dataIndex: 'dbNote',
    valueType: 'textarea',
    cellEdit: true,
  },
  {
    title: '编制时间',
    dataIndex: 'createDatetime',
    valueType: 'dateRange',
    customRender: (_, { createDatetime }) => createDatetime || '',
    align: 'center',
    width: 160,
  },
  {
    title: '状态',
    dataIndex: 'billStatus',
    valueType: 'select',
    valueEnum: ENUMBILLSTATUS,
    customRender: (_, { billStatus }) => <StatusText status={billStatus} />,
    customFieldProps: { showSearch: true },
    search: false,
  },
];

export default columns;
