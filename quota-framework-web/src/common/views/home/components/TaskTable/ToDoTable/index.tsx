/*
 * @Author: SHUANG
 * @Date: 2022-08-04 18:00:56
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-12-25 17:07:17
 * @Description: 待办
 */
import { history } from 'umi';
import React, { Suspense, useEffect, useRef, useState } from 'react';

import { getLocationUrl, setLocationUrl } from '../../../../../../utils/util/location';
import { ModalActionType } from '../../../../../../components/BaseModal/typings';
import { noticeViewUpdate } from '../../../../message/Notice/services';
import BaseTable from '../../../../../../components/BaseTable';

import { BusinessItem, ToDoListItem } from '../../../typings';
import { queryTaskAssignee } from '../../../services';
import useTableColumns from './useTableColumns';
import { beforeSearchSubmit } from '../utils';

/** 来自各系统 */
const ProcessMainFormHidden = React.lazy(() => import('@/common/process/ProcessMainForm'));
import { workflowDescUrlMap } from '@/common/constant/workflow';

export default (props: { getTaskStamp: any }) => {
  const actionRef = useRef<ModalActionType>();

  const proListActionRef = useRef<any>();

  const [actionCurrent, setActionCurrent] = useState<ToDoListItem | BusinessItem>();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  // 携带了参数
  useEffect(() => {
    if (getLocationUrl() === history.location.pathname) return;
    if (history.location.pathname.includes('/home') && history.location.pathname?.length > 6) {
      // 通过 ‘/ 截取
      const locationUrl = history.location.pathname.split('/');
      if (locationUrl?.length !== 4 && locationUrl?.length !== 6) return;
      const businessKey = locationUrl[2];
      const businessId = locationUrl[3];
      const businessTypeName = workflowDescUrlMap[businessKey];
      if (!businessTypeName || !businessKey || !businessId) return;
      if (isOpen) {
        setActionCurrent(undefined);
        return;
      }
      setActionCurrent({ businessKey, businessId, businessTypeName });
      setTimeout(() => {
        setLocationUrl(history.location.pathname);
        /** 如果是通知类型 */
        if (locationUrl[4] === 'notice' && !!locationUrl[5]) {
          noticeViewUpdate(locationUrl[5]);
        }
        actionRef.current?.open?.();
      }, 27);
    }
  }, []);

  return (
    <>
      <BaseTable
        className="todoList"
        persistenceKey="COMMONVIEWSTODOTABLE"
        search={{ labelWidth: 55, span: 4, searchGutter: 10 }}
        columns={useTableColumns(setIsOpen, proListActionRef)}
        beforeSearchSubmit={beforeSearchSubmit}
        service={{
          dataSourceRequest: async (params) => {
            const res = await queryTaskAssignee({ ...params });
            props?.getTaskStamp?.();
            return res;
          },
        }}
        onDoubleClick={(record) => {
          if (isOpen) {
            setActionCurrent(undefined);
            return;
          }
          setActionCurrent(record);
          setTimeout(() => {
            actionRef.current?.open?.();
          }, 27);
        }}
        toolBarRender={false}
        rowSelection={false}
        rowKey={false}
      />
      <Suspense fallback={<>Loading...</>}>
        <ProcessMainFormHidden
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
