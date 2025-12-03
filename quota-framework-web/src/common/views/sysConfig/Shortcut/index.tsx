/*
 * @Author: SHUANG
 * @Date: 2023-07-25 15:20:57
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-10-13 15:43:33
 * @Description: 系统快捷方式管理
 */
import { BaseTableProps, TableToolbarDefine } from '../../../../components/BaseTable/typings';
import ViewContainer from '../../../../components/ViewContainer';
import BaseTable from '../../../../components/BaseTable';

import useTableColumns from './useTableColumns';
import useFormColumns from './useFormColumns';
import * as TYPES from './typings';
import * as API from './services';

const actionProps = {
  schemaFormProps: {
    grid: true,
    colProps: { span: 24 },
    shouldUpdate: (newValues: any, oldValues: any) => {
      if (newValues.sysType !== oldValues?.sysType) return true;
      else return false;
    },
  },
  modalProps: { width: 460 },
};

export default () => {
  const toolbar: TableToolbarDefine<TYPES.ShortcutItemSave> = {
    plus: { columns: useFormColumns, ...actionProps, onSubmit: API.shortcutSave },
    edit: { columns: useFormColumns, ...actionProps, onSubmit: API.shortcutSave },
    enable: { onSubmit: API.shortcutUpdateStatusByIds },
    disable: { onSubmit: API.shortcutUpdateStatusByIds },
    deleted: {
      actionControl: { key: 'billStatus', value: '3', message: '启用状态的数据不允许删除!', equal: true },
      onSubmit: API.shortcutDeleteByIds,
    },
  };

  const generateTable: BaseTableProps<TYPES.ShortcutListItem> = {
    persistenceKey: 'COMMONVIEWSCONFIGSHORTCUTTABLE',
    service: { dataSourceRequest: API.shortcutQueryPageInfo },
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
