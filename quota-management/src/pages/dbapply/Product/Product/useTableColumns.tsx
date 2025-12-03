/*
 * @Author: SHUANG
 * @Date: 2024-01-10 14:14:21
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-22 17:08:29
 * @Description: 工程造价产品-产品信息
 */
import ProcessStatus from 'jd-framework-web/package/common/textTag/ProcessStatus';
import { TableColumnsDefine } from 'jd-framework-web/package/components';
import { valueEnumsRequest } from '../valueEnums';

const columns: TableColumnsDefine<any> = [
  {
    title: '序号',
    dataIndex: 'index',
    align: 'center',
    width: 50,
  },
  {
    title: '状态',
    dataIndex: 'billStatus',
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
    title: '产品名称',
    dataIndex: 'productName',
    width: 180,
  },
  {
    title: '产品阶段',
    dataIndex: 'productPhase',
    valueType: 'select',
    request: async () => valueEnumsRequest('dbapply_phase'),
    width: 100,
  },
  {
    title: '产品类型',
    dataIndex: 'productType',
    valueType: 'select',
    request: async () => valueEnumsRequest('dbapply_type'),
    width: 100,
  },
  {
    title: '版本号',
    dataIndex: 'versionCode',
    align: 'center',
    width: 90,
  },
  {
    title: '编制人',
    dataIndex: 'editPerson',
    width: 150,
  },
  {
    title: '校核人',
    dataIndex: 'proofreadPerson',
    width: 150,
  },
  {
    title: '审查人',
    dataIndex: 'checkPerson',
    width: 150,
  },
  {
    title: '备注',
    dataIndex: 'note',
    valueType: 'textarea',
  },
];

export default columns;
