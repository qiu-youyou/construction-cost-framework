/*
 * @Author: SHUANG
 * @Date: 2023-07-26 11:24:36
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-01-15 15:52:10
 * @Description: 节假日管理
 */
import { BaseTableProps, TableToolbarDefine } from '../../../../components/BaseTable/typings';
import ViewContainer from '../../../../components/ViewContainer';
import BaseTable from '../../../../components/BaseTable';

import useTableColumns from './useTableColumns';
import useFormColumns from './useFormColumns';
import * as TYPES from './typings';
import * as API from './services';

const actionProps = {
  schemaFormProps: { grid: true, colProps: { span: 24 } },
  modalProps: { width: 460 },
};

export default () => {
  const toolbar: TableToolbarDefine<Partial<TYPES.HolidayListItem>> = {
    plus: { columns: useFormColumns, ...actionProps, onSubmit: API.sysHolidaySave },
    edit: { columns: useFormColumns, ...actionProps, onSubmit: API.sysHolidaySave },
    enable: { onSubmit: API.sysHolidayUpdateStatusByIds },
    disable: { onSubmit: API.sysHolidayUpdateStatusByIds },
    deleted: {
      actionControl: { key: 'billStatus', value: '3', message: '启用状态的数据不允许删除!', equal: true },
      onSubmit: API.sysHolidayDeleteByIds,
    },
  };

  const generateTable: BaseTableProps<TYPES.HolidayListItem> = {
    persistenceKey: 'COMMONVIEWSCONFIGHOLIDAYTABLE',
    service: { dataSourceRequest: API.sysHolidayQueryPageInfo },
    rowSelection: { columnWidth: 30 },
    columns: useTableColumns,
    toolbarAuthority: true,
    virtual: false,
    toolbar,
  };

  return (
    <ViewContainer>
      <BaseTable {...generateTable} />
    </ViewContainer>
  );
};
