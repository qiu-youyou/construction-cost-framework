/*
 * @Author: SHUANG
 * @Date: 2024-02-29 13:50:58
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-03-01 11:30:05
 * @Description: 基础企业定额
 */
import { Space } from 'antd';

import { TableColumnsDefine } from 'jd-framework-web/package/components';
import ProcessChart from 'jd-framework-web/package/common/process/ProcessChart';
import ProcessStatus from 'jd-framework-web/package/common/textTag/ProcessStatus';
import ProcessHistoryTable from 'jd-framework-web/package/common/process/ProcessHistoryTable';
import { ENUMPROCESSSTATUS } from 'jd-framework-web/package/common/constant/valueEnum';

import { BasicDatabaseDbItem } from './typings';

const columns: TableColumnsDefine<BasicDatabaseDbItem> = [
  {
    title: '序号',
    dataIndex: 'index',
    align: 'center',
    width: 55,
  },
  {
    title: '操作',
    width: 70,
    align: 'center',
    search: false,
    dataIndex: 'action',
    customRender: (_, { processInstanceId, processDefinitionId }) => (
      <Space>
        <ProcessChart
          button="icon"
          processInstanceId={processInstanceId}
          processDefinitionId={processDefinitionId}
        />
        <ProcessHistoryTable button="icon" processInstanceId={processInstanceId} />
      </Space>
    ),
  },
  {
    title: '状态',
    dataIndex: 'billStatus',
    valueType: 'select',
    valueEnum: ENUMPROCESSSTATUS,
    customRender: (_, { billStatus, workflowLockStatus, returnStatus }) => (
      <ProcessStatus
        status={billStatus}
        workflowLockStatus={workflowLockStatus}
        returnStatus={returnStatus}
      />
    ),
  },

  {
    title: '定额库编码',
    dataIndex: 'dbCode',
    align: 'center',
    cellEdit: true,
    width: 130,
  },
  {
    title: '定额库名称',
    dataIndex: 'dbName',
    valueType: 'textarea',
    cellEdit: true,
  },
  {
    title: '描述',
    dataIndex: 'describe',
    valueType: 'textarea',
    cellEdit: true,
    search: false,
  },
];

export default columns;
