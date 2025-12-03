/*
 * @Author: SHUANG
 * @Date: 2023-01-03 10:50:22
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-09-22 15:44:17
 * @Description: 通知管理
 */

import React, { Suspense, useRef, useState } from 'react';

import BaseTable from '../../../../components/BaseTable';
import ViewContainer from '../../../../components/ViewContainer';
import { ModalActionType } from '../../../../components/BaseModal/typings';
import { BaseTableProps, TableActionType } from '../../../../components/BaseTable/typings';

import { businessNoticeQueryPageInfo } from './services';
import useTableColumns from './useTableColumns';
import { NoticeListItem } from './typings';

// 来自各系统
const ProcessMainFormHidden = React.lazy(() => import('@/common/process/ProcessMainForm'));

const BusinessNotice = () => {
  const actionRef = useRef<ModalActionType>();
  const [actionCurrent, setActionCurrent] = useState<any>();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const actionTableRef = useRef<TableActionType>();

  const handleOnDoubleClick = (record?: NoticeListItem) => {
    if (isOpen) {
      setActionCurrent(undefined);
      return;
    }
    setActionCurrent({ ...record, workflowFormUrl: record?.accessAddress });
    setTimeout(async () => {
      actionRef.current?.open?.();
    }, 27);
  };

  const fetchBusinessNoticeQueryPageInfo = async (params: FETCH.Req) => {
    let fetchParams: any = { ...params };
    if (!!fetchParams?.searchParams) {
      fetchParams = { ...fetchParams, ...JSON.parse(params?.searchParams) };
      delete fetchParams.searchParams;
    }
    const res = await businessNoticeQueryPageInfo(fetchParams);
    return res;
  };

  const generateTable: BaseTableProps<NoticeListItem> = {
    persistenceKey: 'COMMONVIEWSMESSAGENOTICETABLE',
    service: { dataSourceRequest: fetchBusinessNoticeQueryPageInfo },
    onDoubleClick: handleOnDoubleClick,
    actionRef: actionTableRef,
    columns: useTableColumns,
    rowSelection: false,
  };

  return (
    <ViewContainer>
      <BaseTable {...generateTable} />
      <Suspense fallback={<>loading</>}>
        <ProcessMainFormHidden
          formType={2}
          button="none"
          actionRef={actionRef}
          toDoItem={actionCurrent}
          setIsOpen={setIsOpen}
        />
      </Suspense>
    </ViewContainer>
  );
};

export default BusinessNotice;
