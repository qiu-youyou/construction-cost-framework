/*
 * @Author: SHUANG
 * @Date: 2024-04-08 13:57:45
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-08 16:48:45
 * @Description: 树形字典目录
 */
import { BaseTableProps, TableToolbarDefine } from '../../../../../components/BaseTable/typings';
import BaseTable from '../../../../../components/BaseTable';

import useTableColumns from './useTableColumns';
import useFormColumns from './useFormColumns';
import * as TYPES from '../typings';
import * as API from './services';

export default (props: TYPES.DictTreeProps) => {
  const { setDictTreeClassCurrent } = props;

  const toolbar: TableToolbarDefine = {
    plus: { columns: useFormColumns, modalProps: { width: 400 } },
    edit: { columns: useFormColumns, modalProps: { width: 400 } },
    enable: { onSubmit: API.dictTreeClassUpdateStatusByIds },
    disable: { onSubmit: API.dictTreeClassUpdateStatusByIds },
    deleted: { onSubmit: API.dictTreeClassDeleteByIds },
  };

  const generateTable: BaseTableProps<TYPES.DictTreeClassItem> = {
    persistenceKey: 'COMMON_VIEWS_SYSTEM_DICT_TREE_CLASS_TABLE',
    service: { dataSourceRequest: API.dictTreeClassQueryPageInfo },
    onCurrent: (record) => setDictTreeClassCurrent?.(record),
    columns: useTableColumns,
    toolbarAuthority: true,
    virtual: false,
    toolbar,
  };
  return <BaseTable {...generateTable} />;
};
