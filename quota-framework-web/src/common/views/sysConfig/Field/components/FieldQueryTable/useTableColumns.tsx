/*
 * @Author: SHUANG
 * @Date: 2023-07-26 13:51:11
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-09-21 17:06:30
 * @Description: 自定义查询表格
 */
import { TableColumnsDefine } from '../../../../../../components/BaseTable/typings';

import { ENUMBILLSTATUS, ENUMFIELDTYPE } from '../../../../../constant/valueEnum';
import StatusText from '../../../../../textTag/StatusText';
import { FieldQueryListItem } from '../../typings';

const columns: TableColumnsDefine<FieldQueryListItem> = [
  { dataIndex: 'index' },
  {
    title: '查询字段',
    dataIndex: 'fieldName',
  },
  {
    title: '字段描述',
    dataIndex: 'fieldNameEn',
  },
  {
    title: '字段类型',
    dataIndex: 'fieldType',
    valueType: 'select',
    valueEnum: ENUMFIELDTYPE,
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
