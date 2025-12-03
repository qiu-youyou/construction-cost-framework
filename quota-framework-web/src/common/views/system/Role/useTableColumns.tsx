/*
 * @Author: SHUANG
 * @Date: 2022-07-06 15:49:31
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-10-26 14:27:59
 * @Description:
 */
import { TableColumnsDefine } from '../../../../components/BaseTable/typings';

import { ENUMBILLSTATUS, ENUMROLETYPE } from '../../../constant/valueEnum';
import RoleTypeText from '../../../textTag/RoleTypeText';
import StatusText from '../../../textTag/StatusText';
import { RoleListItem } from './typings';

export const columns: TableColumnsDefine<RoleListItem> = [
  {
    title: '角色编码',
    dataIndex: 'roleCode',
    align: 'center',
    width: 110,
  },
  {
    title: '角色名称',
    dataIndex: 'roleName',
    width: 160,
  },
  {
    title: '角色类型',
    dataIndex: 'roleType',
    valueType: 'select',
    valueEnum: ENUMROLETYPE,
    customRender: (_, { roleType }) => <RoleTypeText roleType={roleType} />,
    customFieldProps: { showSearch: true },
    search: false,
    width: 40,
  },
  {
    title: '角色描述',
    dataIndex: 'roleRemarks',
    search: false,
  },
  {
    title: '状态',
    width: 35,
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
