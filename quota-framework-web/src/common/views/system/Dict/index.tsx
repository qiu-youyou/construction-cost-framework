/*
 * @Author: SHUANG
 * @Date: 2022-09-01 15:18:50
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-01-15 16:20:18
 * @Description: 字典管理
 */
import { useState } from 'react';
import { BaseTableProps, TableToolbarDefine } from '../../../../components/BaseTable/typings';
import SplitPane, { PaneContainer } from '../../../../components/SplitPane';
import ViewContainer from '../../../../components/ViewContainer';
import BaseTable from '../../../../components/BaseTable';
import BaseCard from '../../../../components/BaseCard';

import useTableColumns from './useTableColumns';
import useFormColumns from './useFormColumns';
import * as TYPES from './typings';
import * as API from './services';

/** 使用 USER表 和 ROLE表 */
const { dictClassFormColums, dictItemFormColums } = useFormColumns();
const { dictClassTableColumns, dictItemTableColumns } = useTableColumns();

const Dict: React.FC = () => {
  /** states */
  const [currentDictClass, setCurrentDictClass] = useState<TYPES.DictClassItem>();

  /** 生成 字典类别 Table */
  const userTableToolbar: TableToolbarDefine<TYPES.DictClassAction> = {
    plus: { modalTitle: '新增字典类型', columns: dictClassFormColums, onSubmit: API.dictClassSave },
    edit: { modalTitle: '编辑字典类型', columns: dictClassFormColums, onSubmit: API.dictClassSave },
    enable: { onSubmit: API.dictClassUpdateStatusByIds },
    disable: { onSubmit: API.dictClassUpdateStatusByIds },
    deleted: {
      actionControl: { key: 'billStatus', value: '3', message: '启用状态的数据不允许删除!', equal: true },
      onSubmit: API.dictClassDeleteByIds,
    },
  };

  const generateDictClassTable: BaseTableProps<TYPES.DictClassItem> = {
    service: { dataSourceRequest: API.dictClassQueryPageInfo },
    onCurrent: (record) => setCurrentDictClass(record),
    persistenceKey: 'COMMONVIEWSSYSTEMDICTCLASSTABLE',
    columns: dictClassTableColumns,
    toolbar: userTableToolbar,
    toolbarAuthority: true,
    virtual: false,
  };

  /** 生成 字典项 Table */
  const roleTableToolbar: TableToolbarDefine<TYPES.DictItemAction> = {
    plus: { modalTitle: '新增字典项', columns: dictItemFormColums, onSubmit: API.dictItemSave },
    edit: { modalTitle: '编辑字典项', columns: dictItemFormColums, onSubmit: API.dictItemSave },
    deleted: {
      actionControl: { key: 'billStatus', value: '3', message: '启用状态的数据不允许删除!', equal: true },
      onSubmit: API.dictItemDeleteByIds,
    },
    enable: { onSubmit: API.dictItemUpdateStatusByIds },
    disable: { onSubmit: API.dictItemUpdateStatusByIds },
  };

  const generateDictItemTable: BaseTableProps<TYPES.DictItemItem, TYPES.DictItemListParams> = {
    persistenceKey: 'COMMONVIEWSSYSTEMDICTITEMTABLE',
    service: {
      params: { businessId: currentDictClass?.id || '' },
      dataSourceRequest: API.dictItemQueryPageInfo,
      manualRequest: !currentDictClass?.id,
    },
    columns: dictItemTableColumns,
    toolbar: roleTableToolbar,
    toolbarAuthority: true,
    virtual: false,
  };

  return (
    <ViewContainer>
      <SplitPane>
        <PaneContainer width="52%">
          <BaseCard title="字典类别">
            <BaseTable {...generateDictClassTable} />
          </BaseCard>
        </PaneContainer>
        <PaneContainer flex>
          <BaseCard title="字典项">
            <BaseTable {...generateDictItemTable} />
          </BaseCard>
        </PaneContainer>
      </SplitPane>
    </ViewContainer>
  );
};

export default Dict;
