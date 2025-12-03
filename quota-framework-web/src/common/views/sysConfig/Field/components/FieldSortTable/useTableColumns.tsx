/*
 * @Author: SHUANG
 * @Date: 2023-08-01 11:44:52
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-08-01 14:45:47
 * @Description: 自定义查询 表单
 */
import { TableColumnsDefine } from '../../../../../../components/BaseTable/typings';
import { ENUMBILLSTATUS } from '../../../../../constant/valueEnum';
import StatusText from '../../../../../textTag/StatusText';
import { FieldSortListItem } from '../../typings';

const columns: TableColumnsDefine<FieldSortListItem> = [
  { dataIndex: 'index' },
  {
    title: '排序字段',
    dataIndex: 'fieldName',
  },
  {
    title: '字段描述',
    dataIndex: 'fieldNameEn',
  },
  {
    title: '创建人',
    dataIndex: 'createMan',
    align: 'center',

    search: false,
    width: 90,
  },
  {
    title: '创建时间',
    dataIndex: 'createDatetime',
    align: 'center',

    search: false,
    width: 100,
  },
  {
    title: '修改人',
    dataIndex: 'updateMan',
    align: 'center',

    search: false,
    width: 90,
  },
  {
    title: '修改时间',
    dataIndex: 'updateDatetime',
    align: 'center',

    search: false,
    width: 100,
  },
  {
    title: '状态',
    dataIndex: 'billStatus',
    valueType: 'select',
    valueEnum: ENUMBILLSTATUS,
    customRender: (_, { billStatus }) => <StatusText status={billStatus} />,
    customFieldProps: { showSearch: true },
    search: false,
    width: 50,
  },
];

export default columns;
