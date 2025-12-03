/*
 * @Author: SHUANG
 * @Date: 2023-05-15 14:22:15
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-09-14 17:42:29
 * @Description: 重大问题反馈 及投诉
 */
import { useRef, useState } from 'react';

import { largeIssueDeleteByIds, largeIssueExport, largeIssueQueryPageInfo } from './services';
import useTableColumns from './useTableColumns';
import IssueDetials from './IssueDetials';
import { IssueListItem } from './typings';
import { BaseTableProps, TableActionType, TableToolbarDefine } from '@/components/BaseTable/typings';
import ProcessButton from '@/common/process/ProcessButton';
import ViewContainer from '@/components/ViewContainer';
import BaseTable from '@/components/BaseTable';

export default () => {
  const tableActionRef = useRef<TableActionType>();

  /** 表格刷新 */
  const tableReload = () => tableActionRef.current?.reload?.();

  /** 当前单据 */
  const [issueCurrent, setIssueCurrent] = useState<IssueListItem>();

  /** 当前主单据详情 */
  const IssueMainForm = ({ formType }: { formType: SYS.FormType }) => (
    <IssueDetials formType={formType} issueCurrent={issueCurrent} />
  );

  /** 操作主单据 */
  const modalProps = { afterClose: tableReload };

  const toolbar: TableToolbarDefine = {
    /** 新增 */
    plus: { render: <IssueMainForm formType={1} />, modalProps },
    /** 编辑 */
    edit: { render: <IssueMainForm formType={2} />, modalProps },
    /** 详情 */
    details: { render: <IssueMainForm formType={0} /> },

    /** 删除 */
    deleted: {
      actionControl: { key: 'billStatus', message: '禁止删除审批中和已完成的单据!', value: '0' },
      onSubmit: largeIssueDeleteByIds,
    },
    /** 导出 */
    export: { onSubmit: largeIssueExport },
    /** 高级查询 */
    seniorSearch: { customKey: 'demo' },
  };

  /** 在 Table Toolbar 后面增加 流程按钮 */
  const toolbarLast = (
    <ProcessButton commitUrl="/sample/large/issue" current={issueCurrent} refresh={tableReload} mode="list" />
  );

  const generateTable: BaseTableProps<IssueListItem> = {
    persistenceKey: 'DEMOWORKFLOWTABLE',
    service: { dataSourceRequest: largeIssueQueryPageInfo },
    onActionCurrent: (record) => setIssueCurrent(record),
    search: { labelWidth: 60 },
    columns: useTableColumns(),
    actionRef: tableActionRef,
    moduleKey: 'workflowDemo',
    toolbarAuthority: true,
    toolbarLast,
    toolbar,
  };

  return (
    <ViewContainer>
      <BaseTable {...generateTable} />
    </ViewContainer>
  );
};
