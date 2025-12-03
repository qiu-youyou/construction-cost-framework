/*
 * @Author: SHUANG
 * @Date: 2022-08-17 15:50:35
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-07-28 16:40:48
 * @Description:
 */
import { TableColumnsDefine } from '../../../../components/BaseTable/typings';
import { ENUMBILLSTATUS } from '../../../constant/valueEnum';
import StatusText from '../../../textTag/StatusText';
import { BusinessDictListItem } from './typings';

const columns: TableColumnsDefine<BusinessDictListItem> = [
  {
    title: '业务名称',
    dataIndex: 'businessName',
    align: 'center',
  },
  {
    title: '业务描述',
    dataIndex: 'description',
    valueType: 'textarea',
    align: 'center',
  },
  {
    title: '默认规则',
    dataIndex: 'defaultRule',
    align: 'center',
  },
  {
    title: '工作流 KEY',
    dataIndex: 'workflowKey',
    align: 'center',
  },
  {
    title: '工作流开启页面 URL',
    dataIndex: 'workflowFormUrl',
    align: 'center',
    search: false,
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
