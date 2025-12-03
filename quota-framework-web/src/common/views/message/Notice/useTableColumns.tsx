/*
 * @Author: SHUANG
 * @Date: 2022-09-01 15:18:50
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-09-21 17:00:06
 * @Description:
 */
import { TableColumnsDefine } from '../../../../components/BaseTable/typings';
import { NoticeListItem } from './typings';

const StyleRefuse = {
  width: 8,
  height: 8,
  display: 'inline-block',
  borderRadius: '50%',
  marginRight: 8,
};

const StyleText = { color: '#000000D9' };

const RenderRefuse = ({ color }: { color: string }) => {
  return <span style={{ ...StyleRefuse, backgroundColor: color }} />;
};

const columns: TableColumnsDefine<NoticeListItem> = [
  { dataIndex: 'index', width: 40 },
  {
    title: '业务名称',
    dataIndex: 'businessName',

    width: 150,
  },
  {
    title: '单据编码',
    dataIndex: 'projectCode',

    width: 150,
  },
  {
    title: '单据名称',
    dataIndex: 'billName',

    width: 190,
  },
  {
    title: '任务名称',
    dataIndex: 'taskName',

    search: false,
    width: 200,
  },
  {
    title: '发送通知人',
    dataIndex: 'createMan',
    align: 'center',

    width: 110,
  },
  {
    title: '通知时间',
    dataIndex: 'createDatetime',
    align: 'center',
    search: false,
    width: 150,
  },
  {
    title: '消息内容',
    dataIndex: 'content',
    valueType: 'textarea',
    search: false,
  },
  {
    title: '被通知人',
    dataIndex: 'userName',
    align: 'center',

    search: false,
    width: 100,
  },
  {
    title: '通知状态',
    dataIndex: 'content',
    align: 'center',
    customRender: (_, { billStatus }) => (
      <div style={StyleText}>
        {billStatus == '0' ? <RenderRefuse color="#ff1e34" /> : <RenderRefuse color="#52c41a" />}
        {billStatus == '0' ? '未查阅' : '已查阅'}
      </div>
    ),
    search: false,
    width: 80,
  },
  {
    title: '查阅时间',
    dataIndex: 'noticeLookDateStr',
    align: 'center',
    search: false,

    width: 120,
  },
  {
    title: '通知时间',
    dataIndex: 'dateTime',
    valueType: 'dateRange',
    hideInTable: true,
  },
];

export default columns;
