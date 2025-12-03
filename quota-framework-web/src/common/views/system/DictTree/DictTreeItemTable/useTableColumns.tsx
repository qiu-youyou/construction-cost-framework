/*
 * @Author: SHUANG
 * @Date: 2024-04-08 16:31:27
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-08 17:06:20
 * @Description:
 */

import { TableColumnsDefine } from '../../../../../components/BaseTable/typings';
import { ENUMBILLSTATUS } from '../../../../constant/valueEnum';
import StatusText from '../../../../textTag/StatusText';
import { DictTreeItem } from '../typings';

const columns: TableColumnsDefine<DictTreeItem> = [
  {
    title: '序号',
    dataIndex: 'index',
  },
  {
    title: '字典编码',
    dataIndex: 'itemCode',
    align: 'center',
    width: 190,
  },
  {
    title: '字典名称',
    dataIndex: 'itemName',
    valueType: 'textarea',
    align: 'center',
  },
  {
    title: '功能标记',
    dataIndex: 'itemType',
    align: 'center',
  },
  {
    title: '备注',
    dataIndex: 'itemRemarks',
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
