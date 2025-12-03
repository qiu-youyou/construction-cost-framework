/*
 * @Author: SHUANG
 * @Date: 2023-11-09 14:36:32
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-03-28 16:01:31
 * @Description: 标准库-次材市场价格库-明细
 */
import { ReactNode } from 'react';
import BaseTable from 'jd-framework-web/package/components/BaseTable';
import useAuthButton from 'jd-framework-web/package/utils/auth/useAuthButton';
import { BaseTableProps, TableToolbarDefine } from 'jd-framework-web/package/components';

import { DbMatItem } from '@/pages/database/DbMain/DatabaseMain/DataBasePane/DbMat/DbMatMainTable/typings';
import DbMatBranchInsert from '@/pages/database/common/DbMatBranchInsert';

import { StdSubsidiaryMatProps } from '../typings';
import useTableColumns from './useTableColumns';
import * as TYPES from './typings';
import * as API from './services';
import * as FET from './fetch';

/** 操作栏插槽 */
type Props = {
  toolbarSlot?: ReactNode;
  subsidiaryMatTableProps?: Partial<BaseTableProps>;
};

export default (props: StdSubsidiaryMatProps & Props) => {
  const { auth } = useAuthButton();

  const { toolbarSlot } = props;
  const { subsidiaryMatTableProps } = props;

  /** 当前次材明细表REF */
  const { subsidiaryMatDetailTableRef } = props;
  /** 当前选中目录 */
  const { subsidiaryMatDirectoryCurrent } = props;

  /** 当前选中目录ID */
  const deviceMatDirectoryId = subsidiaryMatDirectoryCurrent?.id || '';
  /** 当前次材市场价格、设置当前次材市场价格 */
  const { setSubsidiaryMatDetailSelection } = props;
  const { subsidiaryMatDetailCurrent, setSubsidiaryMatDetailCurrent } = props;

  const { subsidiaryMatDetailAction, setSubsidiaryMatDetailAction } = props;

  /** 操作栏禁用条件 */
  const toolbarDisabled = !subsidiaryMatDirectoryCurrent || !!subsidiaryMatDirectoryCurrent?.children?.length;

  /** 引用查询人材机 添加到明细 */
  const dbMatBranchInsertOnSubmit = async (p: DbMatItem[]) =>
    FET.fetchSubsidiaryMatDetailBatchInserByRcj(
      p,
      subsidiaryMatDirectoryCurrent,
      subsidiaryMatDetailAction,
      subsidiaryMatDetailTableRef,
    );

  const toolbarPlusTrigger = (
    <DbMatBranchInsert
      matMainDataSourceRequest={API.matMainQueryPageInfoNotExistSubstrateDetail}
      primaryCurrent={{ id: !toolbarDisabled }}
      onSubmit={dbMatBranchInsertOnSubmit}
      classifyRjcTypePane={['rcj']}
      okText="确 定"
    />
  );

  /** 装置性材料明细表 操作栏 */
  const toolbar: TableToolbarDefine = {
    plus: { trigger: toolbarPlusTrigger, triggerType: 'submit', disabled: toolbarDisabled },
    deleted: { onSubmit: API.subsidiaryMatDetailDeleteByIds },
  };

  /** 次材市场价格明细表 */
  const generateTable: BaseTableProps<TYPES.SubsidiaryMatDetailItem, TYPES.SubsidiaryMatDetailQuery> = {
    persistenceKey: 'PAGESTANDARDSUBSIDIARYMATDETAILTABLE',
    service: {
      dataSourceRequest: FET.fetchSubsidiaryMatDetailQueryPageInfo,
      cellEditSaveRequest: API.subsidiaryMatDetailUpdateRow,
      manualRequest: !deviceMatDirectoryId,
      params: { deviceMatDirectoryId },
    },
    onActionCurrent: setSubsidiaryMatDetailAction,
    onSelections: setSubsidiaryMatDetailSelection,
    onCurrent: setSubsidiaryMatDetailCurrent,
    actionRef: subsidiaryMatDetailTableRef,
    rowSelection: { columnWidth: 30 },
    cellEditable: auth('edit'),
    toolbarAfter: toolbarSlot,
    columns: useTableColumns,
    toolbarAuthority: true,
    virtual: false,
    toolbar,
    ...subsidiaryMatTableProps,
  };

  return <BaseTable {...generateTable} />;
};
