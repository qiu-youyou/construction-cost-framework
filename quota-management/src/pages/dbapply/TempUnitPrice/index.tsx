/*
 * @Author: SHUANG
 * @Date: 2024-04-17 15:01:04
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-18 14:39:44
 * @Description: 综合单价临时库
 */
import { CheckboxProps } from 'antd';
import { useRef, useState } from 'react';
import { BaseTableProps, TableActionType } from 'jd-framework-web/package/components';
import BaseTable from 'jd-framework-web/package/components/BaseTable';
import ViewContainer from 'jd-framework-web/package/components/ViewContainer';
import useTableColumns from './useTableColumns';
import { TempUnitPriceItem } from './typings';
import AcceptButton from './AcceptButton';
import RejectButton from './RejectButton';
import * as API from './services';

export default () => {
  const tempUnitPriceTableRef = useRef<TableActionType>();

  /** 已选数据 */
  const [tempUnitPriceSelection, setTempUnitPriceSelection] = useState<TempUnitPriceItem[]>();

  /** 接受、拒绝 */
  const toolbarBefore = (
    <>
      <AcceptButton
        tempUnitPriceSelection={tempUnitPriceSelection}
        tempUnitPriceTableRef={tempUnitPriceTableRef}
      />
      <RejectButton
        tempUnitPriceSelection={tempUnitPriceSelection}
        tempUnitPriceTableRef={tempUnitPriceTableRef}
      />
    </>
  );

  const getCheckboxProps: (
    record: TempUnitPriceItem,
  ) => Partial<Omit<CheckboxProps, 'checked' | 'defaultChecked'>> = (record) => {
    return { disabled: record?.syncDatabaseStatus == 'Y' || record?.syncDatabaseStatus == 'N' };
  };

  const generateTable: BaseTableProps<TempUnitPriceItem> = {
    persistenceKey: 'PAGES_DBAPPLY_TEMP_UNITPRICE_TABLE',
    service: { dataSourceRequest: API.tempUnitPriceQueryPageInfo },
    onSelections: setTempUnitPriceSelection,
    rowSelection: { getCheckboxProps },
    actionRef: tempUnitPriceTableRef,
    columns: useTableColumns,
    virtual: false,
    toolbarBefore,
  };

  return (
    <ViewContainer>
      <BaseTable {...generateTable} />
    </ViewContainer>
  );
};
