/*
 * @Author: SHUANG
 * @Date: 2023-07-24 17:36:14
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-01-15 16:22:32
 * @Description: 接口日志
 */
import { useState } from 'react';

import { BaseTableProps, TableToolbarDefine } from '../../../../components/BaseTable/typings';
import SplitPane, { PaneContainer } from '../../../../components/SplitPane';
import ViewContainer from '../../../../components/ViewContainer';
import BaseTable from '../../../../components/BaseTable';

import useTableColumns from './useTableColumns';
import useFormColumns from './useFormColumns';
import LogContent from './LogContent';
import * as TYPES from './typings';
import * as API from './services';

const actionProps = {
  schemaFormProps: { grid: true, colProps: { span: 24 } },
  modalProps: { width: 460 },
};

export default () => {
  const [swapLogContent, setSwapLogContent] = useState<TYPES.SwapLogContent>();

  // 根据当前行获取详细内容
  const fetchLogContentByCurrent = async (current?: TYPES.SwapLogListItem) => {
    if (!current?.id) return;
    const res = await API.dataSwapLogQueryContentById({ id: current?.id });
    if (res?.status !== 'SUCCESS') setSwapLogContent({});
    setSwapLogContent(res?.rows);
  };

  // 接口日志表
  const toolbar: TableToolbarDefine<TYPES.SwapLogListItem> = {
    edit: {
      ...actionProps,
      buttonText: '编辑备注',
      modalTitle: '编辑备注',
      columns: useFormColumns,
      onSubmit: API.dataSwapLogUpdateMemoById,
    },
  };

  const generateTable: BaseTableProps<TYPES.SwapLogListItem> = {
    persistenceKey: 'COMMONVIEWSCONITORAPLOGTABLE',
    service: { dataSourceRequest: API.dataSwapLogQueryPageInfo },
    onCurrent: fetchLogContentByCurrent,
    rowSelection: { columnWidth: 28 },
    columns: useTableColumns,
    toolbarAuthority: true,
    toolbar,
  };

  return (
    <ViewContainer>
      <SplitPane mode="vertical">
        <PaneContainer height="60%">
          <BaseTable {...generateTable} />
        </PaneContainer>
        <PaneContainer flex>
          <LogContent swapLogContent={swapLogContent} />
        </PaneContainer>
      </SplitPane>
    </ViewContainer>
  );
};
