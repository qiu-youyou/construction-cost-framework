/*
 * @Author: SHUANG
 * @Date: 2024-01-18 09:39:26
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-03 13:59:56
 * @Description: 工程造价-工程量指标汇总
 */
import BaseTable from 'jd-framework-web/package/components/BaseTable';
import { BaseTableProps, TableToolbarDefine } from 'jd-framework-web/package/components';

import { ConstructionCostProps } from '../typings';
import useTableColumns from './useTableColumns';
import * as TYPES from './typings';
import * as API from './services';

export default (props: ConstructionCostProps) => {
  /** 当前产品 */
  const { readonly } = props;
  const { productActionCurrent } = props;
  const stageId = productActionCurrent?.id || '';
  const projectId = productActionCurrent?.projectId || '';

  /** TOOLBAR：工程量指标汇总表 */
  const toolbar: TableToolbarDefine = {
    calc: { onSubmit: API.productSumSubindexCalculate },
    export: { auth: !readonly },
  };

  /** 工程量指标汇总表 */
  const generateTable: BaseTableProps<TYPES.SubindexSummaryItem, TYPES.SubindexSummaryQuery> = {
    persistenceKey: 'PAGES_CONSTRUCTION_COST_SUBINDEX_SUMMARY',
    service: {
      dataSourceRequest: API.productSumSubindexQueryPageInfo,
      params: { projectId, stageId },
      manualRequest: !stageId,
    },
    columns: useTableColumns,
    requestSummary: true,
    rowSelection: false,
    search: false,
    toolbar,
  };

  return <BaseTable {...generateTable} />;
};
