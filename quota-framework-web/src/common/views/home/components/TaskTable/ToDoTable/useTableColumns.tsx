/*
 * @Author: SHUANG
 * @Date: 2023-12-25 14:52:48
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-12-26 09:47:45
 * @Description:
 */
import { Space } from 'antd';
import { TableColumnsDefine } from '../../../../../../components/BaseTable/typings';
import FlowTable from '../../../../../process/ProcessHistoryTable';
import ProcessChart from '../../../../../process/ProcessChart';

import FlowHandle from '@/common/process/ProcessMainForm';

const StyleRefuse = {
  display: 'inline-block',
  borderRadius: '50%',
  marginRight: 8,
  height: 8,
  width: 8,
};

const StyleDangerText = { color: '#de2635' };

const RenderRefuse = ({ color }: { color: string }) => {
  return <span style={{ ...StyleRefuse, backgroundColor: color }} />;
};

export default (setIsOpen: React.Dispatch<React.SetStateAction<boolean>>, proListActionRef: any) => {
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
      title: '提交时间',
      dataIndex: 'dateTime',
      valueType: 'dateRange',
      hideInTable: true,
    },

    {
      title: '业务名称',
      dataIndex: 'businessTypeName',
      align: 'center',
      search: false,
      width: 180,
      customRender: (_, row) => {
        return <span style={Number(row?.timeLimit) < 0 ? StyleDangerText : {}}>{row?.businessTypeName}</span>;
      },
    },
    {
      title: '单据编号',
      dataIndex: 'projectId',
      align: 'center',
      search: false,
      width: 160,
      customRender: (_, row) => {
        return <span style={Number(row?.timeLimit) < 0 ? StyleDangerText : {}}>{row?.projectId}</span>;
      },
    },
    {
      title: '单据名称',
      dataIndex: 'businessName',
      align: 'center',
      search: false,
      width: 260,
      customRender: (_, row) => {
        return <span style={Number(row?.timeLimit) < 0 ? StyleDangerText : {}}>{row?.businessName}</span>;
      },
    },
    {
      title: '任务名称',
      dataIndex: 'taskName',
      align: 'center',
      search: false,
      width: 160,
      customRender: (_, row) => {
        return <span style={Number(row?.timeLimit) < 0 ? StyleDangerText : {}}>{row?.taskName}</span>;
      },
    },
    {
      title: '提交时间',
      dataIndex: 'createTime',
      align: 'center',
      search: false,
      width: 110,
      customRender: (_, row) => {
        return <span style={Number(row?.timeLimit) < 0 ? StyleDangerText : {}}>{row?.createTime}</span>;
      },
    },
    {
      title: '审批状态',
      dataIndex: 'refuseFlag',
      align: 'center',
      search: false,
      width: 80,
      customRender: (_, row) => {
        return (
          <div>
            {row?.refuseFlag ? <RenderRefuse color="#f5222d" /> : <RenderRefuse color="#ffc53d" />}
            {row?.refuseFlag ? '被退回' : '待办'}
          </div>
        );
      },
    },
    {
      title: '操作',
      dataIndex: 'action',
      align: 'center',
      search: false,
      width: 90,
      customRender: (_, row) => (
        <Space>
          <ProcessChart
            key={1}
            button="icon"
            setIsOpen={setIsOpen}
            processInstanceId={row.processInstanceId}
            processDefinitionId={row.processDefinitionId}
          />
          <FlowTable key={2} button="icon" setIsOpen={setIsOpen} processInstanceId={row.processInstanceId} />
          <FlowHandle
            key={3}
            formType={2}
            button="icon"
            toDoItem={row}
            setIsOpen={setIsOpen}
            reload={proListActionRef?.current?.reload}
          />
        </Space>
      ),
    },
  ];

  return columns;
};
