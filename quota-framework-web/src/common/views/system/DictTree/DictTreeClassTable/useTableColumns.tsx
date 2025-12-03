/*
 * @Author: SHUANG
 * @Date: 2024-04-08 16:38:04
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-08 17:05:45
 * @Description: 树形字典字典
 */
import { TableColumnsDefine } from '../../../../../components/BaseTable/typings';
import { ENUMBILLSTATUS } from '../../../../constant/valueEnum';
import StatusText from '../../../../textTag/StatusText';
import { DictTreeClassItem } from '../typings';

const columns: TableColumnsDefine<DictTreeClassItem> = [
  {
    title: '序号',
    dataIndex: 'index',
  },
  {
    title: '目录编码',
    dataIndex: 'classEn',
    align: 'center',
    width: 190,
  },
  {
    title: '目录名称',
    dataIndex: 'className',
    valueType: 'textarea',
    align: 'center',
  },
  {
    title: '备注',
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

export default columns;
