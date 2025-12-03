import { Space, Tag } from 'antd';

import { TableColumnsDefine } from '../../../../components/BaseTable/typings';
import RadioGroupButton from '../../../../components/RadioGroupButton';

import ProcessHistoryTable from '../../../process/ProcessHistoryTable';
import ProcessChart from '../../../process/ProcessChart';

import { InstanceListItem } from './typings';

export const columns: TableColumnsDefine<InstanceListItem> = [
  {
    title: '流程名称',
    dataIndex: 'businessName',
    hideInTable: false,
    align: 'center',
  },
  {
    title: '流程名称',
    dataIndex: 'processName',
    align: 'center',
    search: false,
  },
  {
    title: '单据名称',
    dataIndex: 'name',
    hideInTable: true,
    align: 'center',
    width: 160,
  },
  {
    title: '单据名称',
    dataIndex: 'businessName',
    align: 'center',
    search: false,
    width: 160,
  },
  {
    title: '申请人',
    dataIndex: 'applyUserName',
    align: 'center',
    search: false,
  },
  {
    title: '业务类型',
    dataIndex: 'category',
    align: 'center',
    search: false,
    width: 120,
  },
  {
    title: '版本',
    dataIndex: 'version',
    valueType: 'digit',
    align: 'center',
    search: false,
    width: 50,
  },
  {
    title: '启动时间',
    dataIndex: 'startTime',
    align: 'center',

    search: false,
    width: 80,
  },
  {
    title: '结束时间',
    dataIndex: 'endTime',
    align: 'center',

    search: false,
    width: 80,
  },
  {
    title: '是否存活',
    dataIndex: 'activeStatus',
    valueType: 'radioButton',
    valueEnum: {
      true: { text: '是' },
      false: { text: '否' },
    },
    width: 65,
    hideInTable: false,
    customRender: (_, { endTime: v }) => {
      if (!v) return <Tag className="tagSuccess">是</Tag>;
      else return <Tag className="tagDefault">否</Tag>;
    },
    renderFormItem: ({ valueEnum }) => <RadioGroupButton valueEnum={valueEnum} />,
  },
  {
    title: '是否存活',
    dataIndex: 'isActive',
    valueType: 'radioButton',
    valueEnum: {
      true: { text: '是' },
      false: { text: '否' },
    },
    width: 65,
    customRender: (_, { endTime: v }) => {
      if (!v) return <Tag className="tagSuccess">是</Tag>;
      else return <Tag className="tagDefault">否</Tag>;
    },
    renderFormItem: ({ valueEnum }) => <RadioGroupButton valueEnum={valueEnum} />,
    search: false,
  },
  {
    title: '运行状态',
    dataIndex: 'suspensionState',
    align: 'center',
    search: false,
    width: 65,
    customRender: (_, { suspensionState: v }) => {
      if (v === 1) return <Tag className="tagSuccess">激活</Tag>;
      if (v === 2) return <Tag className="tagGold">挂起</Tag>;
      return <Tag className="tagDanger">结束</Tag>;
    },
  },
  {
    title: '流程跟踪',
    valueType: 'option',
    align: 'center',
    search: false,
    width: 60,
    customRender: (_, { processInstanceId, deploymentId }) => (
      <Space>
        <ProcessChart
          button="icon"
          processInstanceId={processInstanceId}
          processDefinitionId={deploymentId}
        />
        <ProcessHistoryTable button="icon" processInstanceId={processInstanceId} />
      </Space>
    ),
  },
];

export default () => {
  return {
    columns,
  };
};
