/*
 * @Author: SHUANG
 * @Date: 2022-08-04 18:00:56
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-12-25 17:06:52
 * @Description: 待办
 */
import React, { Suspense, useRef, useState } from 'react';

import { ModalActionType } from '../../../../../../components/BaseModal/typings';
import BaseTable from '../../../../../../components/BaseTable';
import { BusinessItem, ToDoListItem } from '../../../typings';
import { todoDonequeryPageInfo } from '../../../services';
import useTableColumns from './useTableColumns';
import { beforeSearchSubmit } from '../utils';

/** 来自各系统 */
const ProcessMainFormHidden = React.lazy(() => import('@/common/process/ProcessMainForm'));

export default () => {
  const actionRef = useRef<ModalActionType>();

  const proListActionRef = useRef<any>();

  const [actionCurrent, setActionCurrent] = useState<ToDoListItem | BusinessItem>();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <BaseTable
        className="todoDoneList"
        persistenceKey="COMMONVIEWSTODODONETABLE"
        search={{ labelWidth: 55, span: 4, searchGutter: 10 }}
        columns={useTableColumns(setIsOpen, proListActionRef)}
        beforeSearchSubmit={beforeSearchSubmit}
        service={{ dataSourceRequest: todoDonequeryPageInfo }}
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
          formType={0}
          button="none"
          setIsOpen={setIsOpen}
          actionRef={actionRef}
          toDoItem={actionCurrent}
        />
      </Suspense>
    </>
  );
};
