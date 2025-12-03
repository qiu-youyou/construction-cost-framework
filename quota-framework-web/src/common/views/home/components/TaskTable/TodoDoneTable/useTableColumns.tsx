/*
 * @Author: SHUANG
 * @Date: 2023-12-25 14:52:48
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-12-26 09:49:39
 * @Description:
 */
import { Space } from 'antd';
import { TableColumnsDefine } from '../../../../../../components/BaseTable/typings';
import ProcessHistoryTable from '../../../../../process/ProcessHistoryTable';
import ProcessChart from '../../../../../process/ProcessChart';

import ProcessMainForm from '@/common/process/ProcessMainForm';

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
    },
    {
      title: '单据编号',
      dataIndex: 'projectId',
      align: 'center',
      search: false,
      width: 160,
    },
    {
      title: '单据名称',
      dataIndex: 'businessName',
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
      title: '提交时间',
      dataIndex: 'createTime',
      align: 'center',
      search: false,
      width: 110,
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
            <RenderRefuse color="#52c41a" />
            已办
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

          <ProcessHistoryTable
            key={2}
            button="icon"
            setIsOpen={setIsOpen}
            processInstanceId={row.processInstanceId}
          />

          <ProcessMainForm key={3} button="icon" setIsOpen={setIsOpen} toDoItem={row} formType={0} />
        </Space>
      ),
    },
  ];

  return columns;
};
