/*
 * @Author: SHUANG
 * @Date: 2023-05-29 10:50:31
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-09-21 15:13:37
 * @Description: 人员所属公司
 */

import { TableColumnsDefine } from '../../../components/BaseTable/typings';
import { ENUMBILLSTATUS } from '../../constant/valueEnum';
import StatusText from '../../textTag/StatusText';
import { UserBaseCodeListItem } from './services';

const columns: TableColumnsDefine<UserBaseCodeListItem> = [
  { dataIndex: 'index' },
  {
    title: '公司编码',
    dataIndex: 'productionBaseCode',
    align: 'center',
  },
  {
    title: '公司名称',
    dataIndex: 'productionBaseName',
    align: 'center',
  },

  {
    title: '状态',
    dataIndex: 'billStatus',
    filters: true,
    onFilter: true,
    valueType: 'select',
    valueEnum: ENUMBILLSTATUS,
    customFieldProps: { showSearch: true },
    customRender: (_, { billStatus }) => <StatusText status={billStatus} />,
    search: false,
  },
];

export default () => columns;
