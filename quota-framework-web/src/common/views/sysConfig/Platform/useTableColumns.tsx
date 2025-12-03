/*
 * @Author: SHUANG
 * @Date: 2023-07-24 18:19:53
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-12-29 11:51:18
 * @Description:
 */
import { TableColumnsDefine } from '../../../../components/BaseTable/typings';
import { ENUMBILLSTATUS } from '../../../constant/valueEnum';
import StatusText from '../../../textTag/StatusText';
import { SysConfigListItem } from './typings';

const columns: TableColumnsDefine<SysConfigListItem> = [
  { dataIndex: 'index', width: 35 },
  {
    title: '配置名',
    dataIndex: 'configTitle',
  },
  {
    title: '配置Key',
    dataIndex: 'configKey',
    copyable: true,
  },
  {
    title: '配置值',
    dataIndex: 'configValue',
    copyable: true,
    width: 380,
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
    width: 90,
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
    width: 90,
  },
  {
    title: '状态',
    dataIndex: 'billStatus',
    valueType: 'select',
    valueEnum: ENUMBILLSTATUS,
    customRender: (_, { billStatus }) => <StatusText status={billStatus} />,
    customFieldProps: { showSearch: true },
    search: false,
    width: 40,
  },
];

export default columns;
