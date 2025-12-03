/*
 * @Author: SHUANG
 * @Date: 2024-04-08 16:05:30
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-08 17:36:36
 * @Description: 树形字典
 */
import { BaseTableProps, TableToolbarDefine } from '../../../../../components/BaseTable/typings';
import BaseTable from '../../../../../components/BaseTable';

import useTableColumns from './useTableColumns';
import useFormColumns from './useFormColumns';
import * as TYPES from '../typings';
import * as API from './services';

export default (props: TYPES.DictTreeProps) => {
  const { dictTreeClassCurrent } = props;
  const { setDictTreeItemCurrent } = props;

  const businessId = dictTreeClassCurrent?.id || '';

  const toolbar: TableToolbarDefine = {
    plusLevel: { authKey: 'plus', columns: useFormColumns, modalProps: { width: 400 } },
    edit: { columns: useFormColumns, modalProps: { width: 400 } },
    enable: { onSubmit: API.dictTreeItemUpdateStatusByIds },
    disable: { onSubmit: API.dictTreeItemUpdateStatusByIds },
    deleted: { onSubmit: API.dictTreeItemDeleteByIds },
    expand: { buttonText: '全部' },
  };

  const generateTable: BaseTableProps<TYPES.DictTreeItem, { businessId: string }> = {
    persistenceKey: 'COMMON_VIEWS_SYSTEM_DICT_TREE_ITEM_TABLE',
    service: { dataSourceRequest: API.dictTreeItemQueryPageInfo, params: { businessId } },
    onCurrent: (record) => setDictTreeItemCurrent?.(record),
    columns: useTableColumns,
    toolbarAuthority: true,
    calcTotal: true,
    virtual: false,
    expandable: {},
    toolbar,
  };
  return <BaseTable {...generateTable} />;
};
