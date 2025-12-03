/*
 * @Author: SHUANG
 * @Date: 2024-01-17 09:51:12
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-03 14:04:17
 * @Description: 工程造价-其他费用汇总
 */

import { useRef, useState } from 'react';
import { BaseTableProps } from 'jd-framework-web/package/components';
import BaseTable from 'jd-framework-web/package/components/BaseTable';
import { TableActionType } from 'jd-framework-web/package/components';

import { ConstructionCostProps } from '../typings';
import CallingTemplates from './CallingTemplates';
import useTableColumns from './useTableColumns';
import FeeExpTable from './FeeExpTable';
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
  const otherFeeSummaryTableRef = useRef<TableActionType>();

  /** 当前操作取费模板 */
  const [otherFeeSummaryActionCurrent, setOtherFeeSummaryActionCurrent] = useState<TYPES.OtherSummaryItem>();

  /** 当前 */

  /* TOOLBAR: 其他费汇总 */
  const toolbarAfter = (
    <>
      {/* 调用其他费用汇总模板 */}
      <CallingTemplates
        productActionCurrent={productActionCurrent}
        otherFeeSummaryTableRef={otherFeeSummaryTableRef}
      />

      {/* 查看费用表达式 */}
      <FeeExpTable productActionCurrent={productActionCurrent} />
    </>
  );

  /** 其他费汇总 */
  const otherfeeSummaryTableReload = () => otherFeeSummaryTableRef?.current?.reload?.();

  const generateTable: BaseTableProps<TYPES.OtherSummaryItem, TYPES.OtherSummaryQuery> = {
    persistenceKey: 'PAGES_CONSTRUCTION_COST_OTHERFEE_SUMMARY_TABLE',
    columns: useTableColumns({ otherfeeSummaryTableReload, readonly }),
    service: {
      dataSourceRequest: API.productSumOtherQueryPageInfo,
      cellEditSaveRequest: API.productSumOtherUpdateRow,
      params: { projectId, stageId },
      manualRequest: !stageId,
    },
    toolbar: {
      plusLine: { onSubmit: API.productSumOtherSaveBlankRow },
      deleted: { onSubmit: API.productSumOtherDeleteByIds },
      calc: { onSubmit: API.productSumOtherCalculateFee },
    },
    onActionCurrent: setOtherFeeSummaryActionCurrent,
    toolbarAfter: !readonly && toolbarAfter,
    actionRef: otherFeeSummaryTableRef,
    rowSelection: { columnWidth: 50 },
    toolbarAuthority: readonly,
    cellEditable: !readonly,
    requestSummary: true,
    search: false,
  };

  return <BaseTable {...generateTable} />;
};
