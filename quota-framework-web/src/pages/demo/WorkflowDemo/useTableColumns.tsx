/*
 * @Author: SHUANG
 * @Date: 2023-05-19 09:50:33
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-10-19 12:01:41
 * @Description: 重大问题反馈
 */

import { Space } from 'antd';
import { TableColumnsDefine } from '@/components/BaseTable/typings';
import ProcessHistoryTable from '@/common/process/ProcessHistoryTable';
import ProcessStatus from '@/common/textTag/ProcessStatus';
import ProcessChart from '@/common/process/ProcessChart';

import RadioGroupButton from '@/components/RadioGroupButton';
import { ENUMPROCESSSTATUS } from '@/common/constant/valueEnum';
import { IssueListItem } from './typings';

export const columns: TableColumnsDefine<IssueListItem> = [
  { dataIndex: 'index' },
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
    valueType: 'radioButton',
    valueEnum: ENUMPROCESSSTATUS,
    customRender: (_, { billStatus, workflowLockStatus, returnStatus }) => (
      <ProcessStatus
        status={billStatus}
        workflowLockStatus={workflowLockStatus}
        returnStatus={returnStatus}
      />
    ),
    renderFormItem: ({ valueEnum }) => <RadioGroupButton valueEnum={valueEnum} />,
  },
  {
    title: '时间',
    dataIndex: 'startDateTime',
    valueType: 'dateRange',
    customRender: (_, { startDateTime }) => startDateTime || '',
    align: 'center',
    width: 110,
  },
  {
    title: '发起人',
    dataIndex: 'startPerson',

    align: 'center',
  },
  {
    title: '所在单位',
    dataIndex: 'companyName',

    width: 224,
  },
  {
    title: '联系电话',
    dataIndex: 'phone',
    align: 'center',

    search: false,
    width: 180,
  },
  {
    title: '问题分类',
    dataIndex: 'problemTypeName',
    valueType: 'select',
    // request: async () => DictItem?.ZDWT_WTFL,
    customFieldProps: { fieldNames: { label: 'label', value: 'label' }, showSearch: true },

    width: 130,
  },
  {
    title: '装置代码',
    dataIndex: 'generalFactoryCode',
    align: 'center',
    width: 104,
  },
  {
    title: '生产装置',
    dataIndex: 'generalFactoryName',

    width: 144,
  },
  {
    title: '专业',
    dataIndex: 'costTypeName',
    valueType: 'select',
    // request: async () => DictItem?.COST_TYPE,
    customFieldProps: { fieldNames: { label: 'label', value: 'label' }, showSearch: true },

    width: 120,
  },
  {
    title: '协调环节',
    dataIndex: 'reconciliationName',
    valueType: 'select',
    // request: async () => DictItem?.ZDWT_XTHJ,
    customFieldProps: { fieldNames: { label: 'label', value: 'label' }, showSearch: true },

    width: 130,
  },
  {
    title: '涉及甲方人员',
    dataIndex: 'personName',

    align: 'center',
  },
  {
    title: '是否解决',
    dataIndex: 'solveName',
    valueType: 'select',
    valueEnum: {
      是: { text: '是' },
      否: { text: '否' },
    },
  },
  {
    title: '进程',
    dataIndex: 'processName',
    valueType: 'select',
    // request: async () => DictItem?.ZDWT_PROCESS,
    customFieldProps: { fieldNames: { label: 'label', value: 'label' }, showSearch: true },

    width: 130,
  },
];

export default () => columns;
