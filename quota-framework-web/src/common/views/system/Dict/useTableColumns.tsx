/*
 * @Author: SHUANG
 * @Date: 2022-07-13 11:43:42
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-09-21 17:18:47
 * @Description:
 */
import { TableColumnsDefine } from '../../../../components/BaseTable/typings';
import { ENUMBILLSTATUS } from '../../../constant/valueEnum';
import StatusText from '../../../textTag/StatusText';
import { DictClassItem, DictItemItem } from './typings';

const dictClassTableColumns: TableColumnsDefine<DictClassItem> = [
  {
    dataIndex: 'className',
    title: '类别名称',
    align: 'center',
  },
  {
    dataIndex: 'classEn',
    title: '英文简称',
    align: 'center',
    width: 190,
  },
  {
    title: '类别描述',
    dataIndex: 'classRemarks',
    valueType: 'textarea',
    align: 'center',
  },
  {
    title: '状态',
    dataIndex: 'billStatus',
    filters: true,
    onFilter: true,
    valueType: 'select',
    valueEnum: ENUMBILLSTATUS,
    customRender: (_, { billStatus }) => <StatusText status={billStatus} />,
    customFieldProps: { showSearch: true },
    search: false,
  },
];

const dictItemTableColumns: TableColumnsDefine<DictItemItem> = [
  {
    dataIndex: 'itemName',
    title: '字典名称',
    align: 'center',
  },
  {
    dataIndex: 'itemCode',
    title: '字典编码',
    width: 90,
    align: 'center',
  },
  {
    dataIndex: 'itemRemarks',
    title: '字典描述',
    align: 'center',
  },
  {
    title: '状态',
    dataIndex: 'billStatus',
    filters: true,
    onFilter: true,
    valueType: 'select',
    valueEnum: ENUMBILLSTATUS,
    customRender: (_, { billStatus }) => <StatusText status={billStatus} />,
    customFieldProps: { showSearch: true },
    search: false,
  },
];

export default () => {
  return {
    dictClassTableColumns,
    dictItemTableColumns,
  };
};
