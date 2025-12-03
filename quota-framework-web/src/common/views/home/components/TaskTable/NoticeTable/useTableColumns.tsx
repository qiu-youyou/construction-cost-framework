/*
 * @Author: SHUANG
 * @Date: 2023-12-25 14:52:48
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-12-26 09:53:57
 * @Description:
 */
import { TableColumnsDefine } from '../../../../../../components/BaseTable/typings';

const StyleRefuse = {
  display: 'inline-block',
  borderRadius: '50%',
  marginRight: 8,
  height: 8,
  width: 8,
};

const RenderRefuse = ({ color }: { color: string }) => {
  return <span style={{ ...StyleRefuse, backgroundColor: color }} />;
};

export default () => {
  const columns: TableColumnsDefine<any> = [
    {
      title: '业务名称',
      dataIndex: 'workFlowNameLike',
      hideInTable: true,
    },
    {
      title: '单据编号',
      dataIndex: 'businessCodeLike',
      hideInTable: true,
    },
    {
      title: '单据名称',
      dataIndex: 'businessNameLike',
      hideInTable: true,
    },
    {
      title: '通知人',
      dataIndex: 'createManLike',
      hideInTable: true,
    },
    {
      title: '通知时间',
      dataIndex: 'dateTime',
      valueType: 'dateRange',
      hideInTable: true,
    },

    {
      title: '业务名称',
      dataIndex: 'businessName',
      align: 'center',
      search: false,
      width: 180,
    },
    // projectName
    {
      title: '单据编号',
      dataIndex: 'projectCode',
      align: 'center',
      search: false,
      width: 160,
    },
    {
      title: '单据名称',
      dataIndex: 'billName',
      align: 'center',
      search: false,
      width: 260,
    },
    {
      title: '任务名称',
      dataIndex: 'taskName',
      align: 'center',
      search: false,
      width: 160,
    },
    {
      title: '消息内容',
      dataIndex: 'createDatetime',
      search: false,
      width: 300,
    },
    {
      title: '发送通知人',
      dataIndex: 'createMan',
      align: 'center',
      search: false,
      width: 110,
    },
    {
      title: '通知时间',
      dataIndex: 'content',
      align: 'center',
      search: false,
      width: 120,
    },
    {
      title: '通知状态',
      dataIndex: 'refuseFlag',
      align: 'center',
      search: false,
      width: 90,
      customRender: (_, row) => {
        return (
          <div>
            {!!row.billStatus ? <RenderRefuse color="#ff1e34" /> : <RenderRefuse color="#52c41a" />}
            {!!row.billStatus ? '未查阅' : '已查阅'}
          </div>
        );
      },
    },
  ];

  return columns;
};
