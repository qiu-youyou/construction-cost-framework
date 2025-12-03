/*
 * @Author: SHUANG
 * @Date: 2023-07-25 14:58:09
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-01-15 16:19:14
 * @Description: 区域管理
 */

import BaseTable from '../../../../components/BaseTable';
import { BaseTableProps, TableToolbarDefine } from '../../../../components/BaseTable/typings';
import ViewContainer from '../../../../components/ViewContainer';

import useFormColumns from './useFormColumns';
import useTableColumns from './useTableColumns';
import * as TYPES from './typings';
import * as API from './services';

const actionProps = {
  schemaFormProps: { grid: true, colProps: { span: 24 } },
  modalProps: { width: 460 },
};

export default () => {
  const toolbar: TableToolbarDefine<TYPES.RegionsListItem> = {
    plus: { buttonText: '新增区域', columns: useFormColumns, ...actionProps, onSubmit: API.orgcodegroupSave },
    edit: { modalTitle: '编辑区域', columns: useFormColumns, ...actionProps, onSubmit: API.orgcodegroupSave },
    enable: { onSubmit: API.orgcodegroupUpdateStatusByIds },
    disable: { onSubmit: API.orgcodegroupUpdateStatusByIds },
    deleted: {
      actionControl: { key: 'billStatus', value: '3', message: '启用状态的数据不允许删除!', equal: true },
      onSubmit: API.orgcodegroupDeleteByIds,
    },
  };

  const generateTable: BaseTableProps<TYPES.RegionsListItem> = {
    persistenceKey: 'COMMONVIEWSSYSTEMREGIONTABLE',
    service: { dataSourceRequest: API.orgcodegroupQueryPageInfo },
    rowSelection: { columnWidth: 32 },
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
