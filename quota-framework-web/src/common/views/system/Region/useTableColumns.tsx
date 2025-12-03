/*
 * @Author: SHUANG
 * @Date: 2023-08-01 09:50:52
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-08-02 15:22:17
 * @Description:
 */
import { TableColumnsDefine } from '../../../../components/BaseTable/typings';

import { ENUMBILLSTATUS } from '../../../constant/valueEnum';
import StatusText from '../../../textTag/StatusText';
import { RegionsListItem } from './typings';

const columns: TableColumnsDefine<RegionsListItem> = [
  { dataIndex: 'index', width: 35 },
  {
    title: '组织机构编码',
    dataIndex: 'orgCode',
  },
  {
    title: '流程编码',
    dataIndex: 'powerCode',
  },
  {
    title: '权限编码',
    dataIndex: 'workCode',
  },
  {
    title: '区域描述',
    dataIndex: 'areaNode',
  },
  {
    title: '创建人',
    dataIndex: 'createMan',
    align: 'center',

    search: false,
    width: 110,
  },
  {
    title: '创建时间',
    dataIndex: 'createDatetime',
    align: 'center',

    search: false,
    width: 110,
  },
  {
    title: '修改人',
    dataIndex: 'updateMan',
    align: 'center',

    search: false,
    width: 110,
  },
  {
    title: '修改时间',
    dataIndex: 'updateDatetime',
    align: 'center',

    search: false,
    width: 110,
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
