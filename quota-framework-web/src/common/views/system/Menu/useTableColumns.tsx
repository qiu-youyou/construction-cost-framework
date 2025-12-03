/*
 * @Author: SHUANG
 * @Date: 2022-07-06 15:49:31
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-09-21 17:19:59
 * @Description:
 */
import { TableColumnsDefine } from '../../../../components/BaseTable/typings';
import { ENUMBILLSTATUS } from '../../../constant/valueEnum';
import StatusText from '../../../textTag/StatusText';
import { AuthBtnListItem } from './typings';

const tableColumns: TableColumnsDefine<AuthBtnListItem> = [
  {
    width: 60,
    title: '顺序',
    dataIndex: 'billSort',
    align: 'center',
    search: false,
  },
  {
    dataIndex: 'value',
    title: '权限值',
  },
  {
    dataIndex: 'label',
    title: '权限名称',
  },
  {
    width: 80,
    dataIndex: 'createMan',
    title: '创建人',
    align: 'center',
  },
  {
    width: 60,
    title: '状态',
    dataIndex: 'billStatus',
    valueType: 'select',
    valueEnum: ENUMBILLSTATUS,
    customRender: (_, { billStatus }) => <StatusText status={billStatus} />,
    customFieldProps: { showSearch: true },
    search: false,
  },
];

const tableRoleColumns: TableColumnsDefine<AuthBtnListItem> = [
  {
    dataIndex: 'value',
    title: '权限值',
  },
  {
    dataIndex: 'label',
    title: '权限名称',
  },
];

export default () => {
  return {
    tableColumns,
    tableRoleColumns,
  };
};
