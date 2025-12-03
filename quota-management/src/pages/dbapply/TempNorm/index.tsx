/*
 * @Author: SHUANG
 * @Date: 2024-04-17 15:03:56
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-18 10:42:58
 * @Description: 定额临时库
 */
import { CheckboxProps } from 'antd';
import { useRef, useState } from 'react';
import BaseTable from 'jd-framework-web/package/components/BaseTable';
import ViewContainer from 'jd-framework-web/package/components/ViewContainer';
import { BaseTableProps, TableActionType } from 'jd-framework-web/package/components';
import useTableColumns from './useTableColumns';
import AcceptButton from './AcceptButton';
import RejectButton from './RejectButton';
import { TempNormItem } from './typings';
import * as API from './services';

export default () => {
  const tempNormTableRef = useRef<TableActionType>();

  /** 已选数据 */
  const [tempNormSelection, setTempNormSelection] = useState<TempNormItem[]>();

  /** 接受、拒绝 */
  const toolbarBefore = (
    <>
      <AcceptButton tempNormSelection={tempNormSelection} tempNormTableRef={tempNormTableRef} />
      <RejectButton tempNormSelection={tempNormSelection} tempNormTableRef={tempNormTableRef} />
    </>
  );

  const getCheckboxProps: (
    record: TempNormItem,
  ) => Partial<Omit<CheckboxProps, 'checked' | 'defaultChecked'>> = (record) => {
    return { disabled: record?.syncDatabaseStatus == 'Y' || record?.syncDatabaseStatus == 'N' };
  };

  const generateTable: BaseTableProps<TempNormItem> = {
    persistenceKey: 'PAGES_DBAPPLY_TEMP_NORM_TABLE',
    service: { dataSourceRequest: API.tempNormQueryPageInfo },
    rowSelection: { getCheckboxProps },
    onSelections: setTempNormSelection,
    actionRef: tempNormTableRef,
    columns: useTableColumns,
    toolbarBefore,
    virtual: false
  };

  return (
    <ViewContainer>
      <BaseTable {...generateTable} />
    </ViewContainer>
  );
};
