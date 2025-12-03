/*
 * @Author: SHUANG
 * @Date: 2022-08-04 18:00:56
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-12-25 17:06:39
 * @Description: 通知
 */
import React, { Suspense, useRef, useState } from 'react';

import BaseTable from '../../../../../../components/BaseTable';
import { ModalActionType } from '../../../../../../components/BaseModal/typings';
import { noticeViewUpdate } from '../../../../message/Notice/services';
import { noticeQueryPageInfo } from '../../../services';
import useTableColumns from './useTableColumns';
import { beforeSearchSubmit } from '../utils';

/** 来自各系统 */
const FlowHandleHidden = React.lazy(() => import('@/common/process/ProcessMainForm'));

export default (props: { getTaskStamp: any }) => {
  const actionRef = useRef<ModalActionType>();

  const proListActionRef = useRef<any>();

  const [actionCurrent, setActionCurrent] = useState<any>();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <BaseTable
        className="noticeList"
        persistenceKey="COMMONVIEWSHOMENOTICETABLE"
        search={{ labelWidth: 55, span: 3, searchGutter: 5 }}
        beforeSearchSubmit={beforeSearchSubmit}
        service={{
          dataSourceRequest: async (params) => {
            const res = await noticeQueryPageInfo(params);
            props?.getTaskStamp?.();
            return res;
          },
        }}
        onDoubleClick={(record) => {
          if (isOpen) {
            setActionCurrent(undefined);
            return;
          }
          setActionCurrent({ ...record, workflowFormUrl: record.accessAddress });
          setTimeout(() => {
            noticeViewUpdate(record?.noticeId);
            actionRef.current?.open?.();
          }, 27);
        }}
        columns={useTableColumns()}
        actionRef={proListActionRef}
        toolBarRender={false}
        rowSelection={false}
        rowKey="businessId"
      />
      <Suspense fallback={<>Loading...</>}>
        <FlowHandleHidden
          formType={2}
          button="none"
          actionRef={actionRef}
          toDoItem={actionCurrent}
          setIsOpen={setIsOpen}
          reload={proListActionRef?.current?.reload}
        />
      </Suspense>
    </>
  );
};
