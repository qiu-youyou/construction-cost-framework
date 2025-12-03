/*
 * @Author: SHUANG
 * @Date: 2024-01-18 09:39:26
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-03 13:58:40
 * @Description: 工程造价-造价编制-分部分项汇总
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

  /** TOOLBAR：分部分项汇总表 */
  const toolbar: TableToolbarDefine = {
    calc: { onSubmit: API.productSumSubitemCalculate },
    export: { auth: !readonly },
  };

  /** 分部分项汇总表 */
  const generateTable: BaseTableProps<TYPES.SubitemSummaryItem, TYPES.SubitemSummaryQuery> = {
    persistenceKey: 'PAGES_CONSTRUCTION_COST_SUBITEM_SUMMARY',
    service: {
      dataSourceRequest: API.productSumSubitemQueryPageInfo,
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
