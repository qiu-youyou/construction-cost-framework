/*
 * @Author: SHUANG
 * @Date: 2024-01-10 14:14:21
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-03 11:11:08
 * @Description: 工程造价产品-工程信息
 */
import { ENUMPROCESSSTATUS } from '@/common/constant/valueEnum';
import { TableColumnsDefine } from 'jd-framework-web/package/components';
import ProcessStatus from 'jd-framework-web/package/common/textTag/ProcessStatus';
import { valueEnumsRequest } from '../valueEnums';
import { ProjectItem } from './typings';

const columns: TableColumnsDefine<ProjectItem> = [
  {
    title: '序号',
    dataIndex: 'index',
    align: 'center',
    width: 50,
  },
  {
    title: '状态',
    dataIndex: 'billStatus',
    valueType: 'radioButton',
    valueEnum: ENUMPROCESSSTATUS,
    customRender: (_, { billStatus, workflowLockStatus, returnStatus }) => (
      <ProcessStatus
        workflowLockStatus={workflowLockStatus}
        returnStatus={returnStatus}
        status={billStatus}
      />
    ),
    width: 60,
  },
  {
    title: '项目编码',
    dataIndex: 'projectCode',
    align: 'center',
    width: 70,
  },
  {
    title: '项目名称',
    dataIndex: 'projectName',
    width: 300,
  },
  {
    title: '项目负责人',
    dataIndex: 'projectLeaderPerson',
    search: false,
    width: 180,
  },
  {
    title: '审查人',
    dataIndex: 'projectCheckPerson',
    search: false,
    width: 180,
  },
  {
    title: '业务类型',
    dataIndex: 'projectBusinessType',
    valueType: 'select',
    request: async () => valueEnumsRequest('busi_type'),
    width: 90,
  },
  {
    title: '行业类型',
    dataIndex: 'projectIndustry',
    align: 'center',
    width: 180,
  },
  {
    title: '国别',
    dataIndex: 'projectCounty',
    align: 'center',
    search: false,
    width: 150,
  },
  {
    title: '省份',
    dataIndex: 'projectProvince',
    align: 'center',
    search: false,
    width: 70,
  },
  {
    title: '登记时间',
    dataIndex: 'enrollDate',
    align: 'center',
    search: false,
    width: 140,
  },
];

export default columns;
