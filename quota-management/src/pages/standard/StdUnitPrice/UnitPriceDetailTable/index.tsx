/*
 * @Author: SHUANG
 * @Date: 2023-11-15 14:28:58
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-03-20 10:43:26
 * @Description: 标准综合单价库 - 清单明细
 */
import BaseTable from 'jd-framework-web/package/components/BaseTable';
import useAuthButton from 'jd-framework-web/package/utils/auth/useAuthButton';
import { BaseTableProps, TableToolbarDefine } from 'jd-framework-web/package/components';

import { RelationDirectoryItem } from '../../StdRelationNorm/RelationDirectoryTree/typings';
import UpdateUnitPriceCodeReSort from './UpdateUnitPriceCodeReSort';
import SyncMappingRelationNrom from './SyncMappingRelationNrom';
import UnitPriceAnalysisTable from './UnitPriceAnalysisTable';

import { jondaReportExcel } from '@/common/services/system';
import { OtherTypeApiItem } from '../../StdTypeTarget/typings';
import QueryTypeTarget from './QueryTypeTarget';
import useTableColumns from './useTableColumns';
import { StdUnitPriceProps } from '../typings';
import * as TYPES from './typings';
import * as API from './services';
import * as FET from './fetch';

export default (props: StdUnitPriceProps & TYPES.PropsUnitPriceDetail) => {
  const { auth } = useAuthButton();
  /** REF */
  const { unitPriceDetailTableRef } = props;
  /** 综合单价 当前目录 */
  const { unitPriceDirectoryCurrent } = props;
  /** 操作栏禁用条件 */
  const toolbarDisabled = !unitPriceDirectoryCurrent;
  /** 综合单价 当前目录 ID */
  const unitPriceDbId = unitPriceDirectoryCurrent?.id || '';
  const listNormDirectoryId = unitPriceDirectoryCurrent?.listNormDirectoryId || '';

  /** 综合单价明细 当前行 勾选行 */
  const { setUnitPriceDetailCurrent, setUnitPriceDetailSelection } = props;
  /** 综合单价明细 操作行 */
  const { unitPriceDetailActionCurrent, setUnitPriceDetailActionCurrent } = props;

  /** PROPS 重构 TABLE */
  const { tableProps } = props;

  /** 综合单价明细表 操作栏 */
  const plusLineOnSubmit = async (p: TYPES.UnitPriceDetailSave) =>
    FET.fetchUnitPriceDetailSaveBlankRow(p, unitPriceDirectoryCurrent, unitPriceDetailActionCurrent);

  /** 操作栏：同步映射库清单数据  */
  const handleSyncRelationNormmOnSubmit = async (p: RelationDirectoryItem) => {
    return await FET.fetchUnitPriceDetailSyncListNorm(p, unitPriceDirectoryCurrent, unitPriceDetailTableRef);
  };
  const SyncMappingRelationNromTrigger = (
    <SyncMappingRelationNrom
      unitPriceDirectoryCurrent={unitPriceDirectoryCurrent}
      onSubmit={handleSyncRelationNormmOnSubmit}
    />
  );

  /** 操作栏：设置单价类型 */
  const queryTypeTargetOnSubmit = async (p?: OtherTypeApiItem) =>
    FET.fetchUnitPriceDetailUpdateRow(p, unitPriceDetailActionCurrent, unitPriceDetailTableRef);
  const QueryTypeTargetTrigger = <QueryTypeTarget onSubmit={queryTypeTargetOnSubmit} />;

  const exportParams = {
    _u: 'file:8381ea2ac8da4844927c8957dbe44964.ureport.xml',
    _n: '标准综合单价库',
    unitPriceDbId,
    listNormDirectoryId,
  };

  /* 操作栏：单价分析表 */
  const UnitPriceAnalysisTableTrigger = (
    <UnitPriceAnalysisTable unitPriceDetailActionCurrent={unitPriceDetailActionCurrent} />
  );

  /*  操作栏：单价编号重组  */
  const UpdateUnitPriceCodeReSortTrigger = (
    <UpdateUnitPriceCodeReSort
      unitPriceDirectoryCurrent={unitPriceDirectoryCurrent}
      unitPriceDetailTableRef={unitPriceDetailTableRef}
    />
  );

  /** 清单明细表 操作栏 Toolbar本bar */
  const toolbar: TableToolbarDefine<TYPES.UnitPriceDetailItem> = {
    plusLine: { authKey: 'price-plus', onSubmit: plusLineOnSubmit, disabled: toolbarDisabled },
    plusOther: { authKey: 'price-sync-list', trigger: SyncMappingRelationNromTrigger, triggerType: 'submit' },
    plusMore: { authKey: 'price-query-type', trigger: QueryTypeTargetTrigger, triggerType: 'submit' },
    deleted: {
      onSubmit: async (p) => API.unitPriceDetailDeleteByIds({ ...p, unitPriceDbId }),
      authKey: 'price-delete',
    },
    details: {
      trigger: UpdateUnitPriceCodeReSortTrigger,
      authKey: 'price-num-recast',
      triggerType: 'submit',
    },
    detailsMore: {
      trigger: UnitPriceAnalysisTableTrigger,
      authKey: 'price-analysis-table',
      triggerType: 'submit',
    },
    export: {
      determineActionCurrent: false,
      onSubmit: jondaReportExcel,
      authKey: 'price-export',
      exportType: 'default',
      exportParams,
    },

    expand: { buttonText: '全部' },
  };

  /** 综合单价 清单明细表 */
  const generateTable: BaseTableProps<TYPES.UnitPriceDetailItem, TYPES.UnitPriceDetailQuery> = {
    persistenceKey: 'PAGESTANDARDCOMPREHENSIVEUNITPRICEDETAILTABLE',
    service: {
      dataSourceRequest: FET.fetchUnitPriceDetailQueryTreeAll,
      cellEditSaveRequest: API.unitPriceDetailUpdateRow,
      params: { unitPriceDbId, listNormDirectoryId },
      manualRequest: !unitPriceDbId,
    },
    onActionCurrent: setUnitPriceDetailActionCurrent,
    onSelections: setUnitPriceDetailSelection,
    onCurrent: setUnitPriceDetailCurrent,
    actionRef: unitPriceDetailTableRef,
    cellEditable: auth('price-edit'),
    toolbarLast: props?.toolbarSlot,
    columns: useTableColumns,
    toolbarAuthority: true,
    pagination: false,
    calcTotal: true,
    expandable: {},
    search: false,
    toolbar,
    ...tableProps,
  };

  return <BaseTable {...generateTable} />;
};
