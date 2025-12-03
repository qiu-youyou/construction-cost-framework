/*
 * @Author: SHUANG
 * @Date: 2023-11-14 15:53:38
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-03-28 16:03:19
 * @Description: 人材机明细重构（材料关联关系设置） - 人材机明细
 */
import { ReactNode } from 'react';
import BaseTable from 'jd-framework-web/package/components/BaseTable';
import { BaseTableProps, TableToolbarDefine } from 'jd-framework-web/package/components';

import { DbMatItem } from '../../DbMain/DatabaseMain/DataBasePane/DbMat/DbMatMainTable/typings';
import DbMatBranchInsert from '../../common/DbMatBranchInsert';
import { fetchDbMatContentSaveSelectMatDetail } from './fetch';
import { DbMatSubsidiaryProps } from '../typings';
import useTableColumns from './useTableColumns';
import * as TYPES from './typings';
import * as API from './services';

/** 操作栏插槽 */
type Props = {
  toolbarSlot?: ReactNode;
  subsidiaryMatDetailTableProps?: Partial<BaseTableProps>;
};

export default (props: DbMatSubsidiaryProps & Props) => {
  const { toolbarSlot } = props;
  const { subsidiaryMatDetailTableProps } = props;

  /** 当前次材明细 */
  const { matSubsidirayDetailCurrent } = props;

  /** TABLE REF */
  const { matSubsidirayDetailTableRef } = props;
  const { matSubsidirayContentTableRef } = props;

  /** 当前人材机明细 */
  const { matSubsidirayContentCurrent, setMatSubsidirayContentCurrent } = props;

  /** 当前次材明细 ID */
  const subsidiaryId = matSubsidirayDetailCurrent?.id || '';

  /** 引用查询人材机 添加到明细 */
  const dbMatBranchInsertOnSubmit = async (p: DbMatItem[]) =>
    fetchDbMatContentSaveSelectMatDetail(
      p,
      matSubsidirayDetailCurrent,
      matSubsidirayContentCurrent,
      matSubsidirayDetailTableRef,
      matSubsidirayContentTableRef,
    );

  const toolbarPlusTrigger = (
    <DbMatBranchInsert
      matMainDataSourceRequest={API.matMainQueryPageInfoNotExistSubsidiary}
      primaryCurrent={{ id: subsidiaryId }}
      onSubmit={dbMatBranchInsertOnSubmit}
      classifyRjcTypePane={['rcj']}
      okText="确 定"
    />
  );

  /** 操作栏 */
  const toolbar: TableToolbarDefine = {
    plus: { trigger: toolbarPlusTrigger, triggerType: 'submit', disabled: !subsidiaryId },
    deleted: {
      onSubmit: async (p) => {
        const res = await API.matSubsidiaryContentDeleteByIds(p);
        if (res?.status === 'SUCCESS') matSubsidirayDetailTableRef?.current?.reload?.();
        return res;
      },
    },
  };

  /** 人材机明细表 */
  const generateTable: BaseTableProps<TYPES.MatSubsidiaryContentItem, TYPES.MatSubsidiaryContentQuery> = {
    persistenceKey: 'PAGESDBMATSUBSIDIARYCONTENTTABLE',
    service: {
      dataSourceRequest: API.matSubsidiaryContentQueryPageInfo,
      manualRequest: !subsidiaryId,
      params: { subsidiaryId },
    },
    onActionCurrent: setMatSubsidirayContentCurrent,
    actionRef: matSubsidirayContentTableRef,
    rowSelection: { columnWidth: 30 },
    toolbarAfter: toolbarSlot,
    columns: useTableColumns,
    toolbarAuthority: true,
    virtual: false,
    search: false,
    toolbar,
    ...subsidiaryMatDetailTableProps,
  };

  return <BaseTable {...generateTable} />;
};
