/*
 * @Author: SHUANG
 * @Date: 2024-01-17 09:51:12
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-03 14:11:41
 * @Description: 工程造价-造价编制-项目汇总
 */

import { useRef, useState } from 'react';
import BaseTable from 'jd-framework-web/package/components/BaseTable';
import { BaseTableProps, TableActionType } from 'jd-framework-web/package/components';

import FeeExpTable from '../OtherfeeSummary/FeeExpTable';
import { ConstructionCostProps } from '../typings';
import CallingTemplates from './CallingTemplates';
import useTableColumns from './useTableColumns';
import * as TYPES from './typings';
import * as API from './services';

export default (props: ConstructionCostProps) => {
  /**  PROPS 当前产品 */
  const { readonly } = props;
  const { productActionCurrent } = props;

  /** 工程ID 阶段ID  */
  const stageId = productActionCurrent?.id || '';
  const projectId = productActionCurrent?.projectId || '';

  /** TABLE REF */
  const projectSummaryTableRef = useRef<TableActionType>();

  /** 当前操作项目汇总 */
  const [projectSummaryActionCurrent, setProjectSummaryActionCurrent] = useState<TYPES.ProjectSummaryItem>();

  /* TOOLBAR: 项目汇总表 */
  const toolbarAfter = (
    <>
      {/* 调用项目汇总模板 */}
      <CallingTemplates
        productActionCurrent={productActionCurrent}
        projectSummaryTableRef={projectSummaryTableRef}
      />

      {/* 查看费用表达式 */}
      <FeeExpTable productActionCurrent={productActionCurrent} />
    </>
  );

  /** 项目汇总表 */
  const projectSummaryTableReload = () => projectSummaryTableRef?.current?.reload?.();
  const generateTable: BaseTableProps<TYPES.ProjectSummaryItem, TYPES.ProjectSummaryQuery> = {
    persistenceKey: 'PAGES_CONSTRUCTION_COST_PROJECT_SUMMARY_TABLE',
    columns: useTableColumns({ projectSummaryTableReload , readonly}),
    service: {
      dataSourceRequest: API.productSumStageQueryPageInfo,
      cellEditSaveRequest: API.productSumStageUpdateRow,
      params: { projectId, stageId },
      manualRequest: !stageId,
    },
    toolbar: {
      plusLine: { onSubmit: API.productSumStageSaveBlankRow },
      deleted: { onSubmit: API.productSumStageDeleteByIds },
      calc: { onSubmit: API.productSumStageCalculateFee },
    },
    onActionCurrent: setProjectSummaryActionCurrent,
    actionRef: projectSummaryTableRef,
    rowSelection: { columnWidth: 50 },
    toolbarAfter: !readonly && toolbarAfter,
    toolbarAuthority: readonly,
    cellEditable: !readonly,
    requestSummary: true,
    search: false,
  };

  return <BaseTable {...generateTable} />;
};
