/*
 * @Author: SHUANG
 * @Date: 2023-07-25 15:31:23
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-10-13 15:43:11
 * @Description: 友情连接维护
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
  const toolbar: TableToolbarDefine<TYPES.ShipLinkItemSave> = {
    plus: { columns: useFormColumns, ...actionProps, onSubmit: API.sysLinkSave },
    edit: { columns: useFormColumns, ...actionProps, onSubmit: API.sysLinkSave },
    enable: { onSubmit: API.sysLinkUpdateStatusByIds },
    disable: { onSubmit: API.sysLinkUpdateStatusByIds },
    deleted: {
      actionControl: { key: 'billStatus', value: '3', message: '启用状态的数据不允许删除!', equal: true },
      onSubmit: API.sysLinkDeleteByIds,
    },
  };

  const generateTable: BaseTableProps<TYPES.ShipLinkListItem> = {
    persistenceKey: 'COMMONVIEWSCONFIGSHIPLINKTABLE',
    service: { dataSourceRequest: API.sysLinkQueryPageInfo },
    rowSelection: { columnWidth: 28 },
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
