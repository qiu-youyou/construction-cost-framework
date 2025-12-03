/*
 * @Author: SHUANG
 * @Date: 2024-01-11 11:55:11
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-23 14:48:41
 * @Description: 工程造价-工程量清单编制-分部分项清单表
 */
import { useState } from 'react';
import { BaseTableProps, TableToolbarDefine } from 'jd-framework-web/package/components';
import BaseTable from 'jd-framework-web/package/components/BaseTable';

import BatchInsertHistoryProjectInventory from './BatchInsertHistoryProjectInventory';
import QueryHistoryProjectDevPrice from './QueryHistoryProjectDevPrice';
import { jondaReportExcel } from '@/common/services/system';
import ExcelUploadPro from '@/common/ExcelUploadPro';
import CodeSerialNumber from './CodeSerialNumber';

import { CostPreparationProps } from '../typings';
import ProductUnitPriceQuery from './ProductUnitPriceQuery';
import InventoryListQuery from './InventoryListQuery';
import AutoUnitPriceCode from './AutoUnitPriceCode';
import InventoryPropert from './InventoryPropert';
import useTableColumns from './useTableColumns';
import SetTypeTarget from './SetTypeTarget';
import LevelSetting from './LevelSetting';
import AssociateWBS from './AssociateWBS';
import * as TYPES from './typings';
import * as API from './services';
import AuditRemarks from './Audit/AuditRemarks';
import AuditClose from './Audit/AuditClose';
import AuditSum from './Audit/AuditSum';

export default (props: CostPreparationProps) => {
  /** 是否审核 */
  const { auditStatus } = props;
  /** PROPS 清单表REF */
  const { inventoryTableRef } = props;
  /**  PROPS 当前产品 */
  const { productActionCurrent } = props;

  /** PROPS 是否只读 重构表 */
  const { readonly, tableProps } = props;

  /** PROPS 当前分部分项目录 */
  const { inventoryDirectoryCurrent } = props;
  /** PROPS 分部分项目录 TREEREF */
  const { inventoryDirectoryTreeRef } = props;

  /** 分部分项清单明细 当前行 */
  const { inventoryCurrent, setInventoryCurrent } = props;

  /** 分部分项清单明细 勾选行 */
  const { inventorySelection, setInventorySelection } = props;

  /** 分部分项清单明细 操作行 */
  const { inventoryActionCurrent, setInventoryActionCurrent } = props;

  /** 当前分部分项清单明细表 数据源 */
  const [inventoryDataSource, setInventoryDataSource] = useState<TYPES.InventoryItem[]>();

  /** 工程ID 阶段ID 分部分项目录ID  */
  const showNumber = inventoryDirectoryCurrent?.showNumber || '';
  const parentId = inventoryDirectoryCurrent?.parentId || '0';
  const directoryId = inventoryDirectoryCurrent?.id || '';
  const projectId = productActionCurrent?.projectId || '';
  const stageId = productActionCurrent?.id || '';

  /** SERVICE 关联参数 */
  const serviceParams = { projectId, parentId, stageId, directoryId, showNumber };

  /** TOOLBAR: 分部分项清单表 */
  const inventoryParams = { inventoryActionCurrent, inventoryTableRef };

  const toolbarLast = (
    <>
      {!readonly && (
        <>
          {/* 升级降级 */}
          <LevelSetting
            inventoryDirectoryTreeRef={inventoryDirectoryTreeRef}
            inventoryDataSource={inventoryDataSource}
            {...inventoryParams}
          />

          <span className="gap-wrapper">｜</span>

          {/* 查询项目综合单价 */}
          <ProductUnitPriceQuery
            productActionCurrent={productActionCurrent}
            serviceParams={serviceParams}
            {...inventoryParams}
          />

          {/* 查询标准清单 */}
          <InventoryListQuery
            inventoryDirectoryTreeRef={inventoryDirectoryTreeRef}
            inventoryActionCurrent={inventoryActionCurrent}
            productActionCurrent={productActionCurrent}
            inventoryTableRef={inventoryTableRef}
          />

          <span className="gap-wrapper">｜</span>

          {/* 设置指标分类 */}
          <SetTypeTarget {...inventoryParams} />

          {/* 关联WBS */}
          <AssociateWBS {...inventoryParams} />

          {/* 项目特征 */}
          <InventoryPropert
            inventoryActionCurrent={inventoryActionCurrent}
            inventoryTableRef={inventoryTableRef}
          />

          <span className="gap-wrapper">｜</span>

          {/* 批量应用历史项目清单 */}
          <BatchInsertHistoryProjectInventory
            inventoryActionCurrent={inventoryActionCurrent}
            productActionCurrent={productActionCurrent}
            inventoryTableRef={inventoryTableRef}
          />

          {/* 查询历史项目设备价格 */}
          <QueryHistoryProjectDevPrice />

          <span className="gap-wrapper">｜</span>

          {/* 自动生成编号 */}
          <CodeSerialNumber
            inventoryDirectoryTreeRef={inventoryDirectoryTreeRef}
            productActionCurrent={productActionCurrent}
            inventoryTableRef={inventoryTableRef}
          />

          {/* 自动匹配综合单价 */}
          <AutoUnitPriceCode
            inventoryDirectoryTreeRef={inventoryDirectoryTreeRef}
            productActionCurrent={productActionCurrent}
            inventoryTableRef={inventoryTableRef}
          />
        </>
      )}

      {auditStatus && (
        <>
          {/* 审核标注 */}
          <AuditRemarks
            inventoryActionCurrent={inventoryActionCurrent}
            productActionCurrent={productActionCurrent}
            inventorySelection={inventorySelection}
            inventoryTableRef={inventoryTableRef}
          />

          {/* 审核闭合 */}
          <AuditClose
            inventoryActionCurrent={inventoryActionCurrent}
            productActionCurrent={productActionCurrent}
            inventorySelection={inventorySelection}
            inventoryTableRef={inventoryTableRef}
          />

          {/* 汇总校审记录 */}
          <AuditSum productActionCurrent={productActionCurrent} />
        </>
      )}
    </>
  );

  /** TOOLBAR: 分部分项清单表 新增方法 */
  const fetchInventorySaveBlankRow = async (p: TYPES.InventoryQuery) => {
    const res = await API.inventorySaveBlankRow(p);
    if (res?.status === 'SUCCESS') inventoryDirectoryTreeRef?.current?.reload?.();
    return res;
  };

  /** TOOLBAR: 分部分项清单表 行编辑方法 */
  const fetchInventoryUpdateRow = async (data: FETCH.CellEditReq, params?: TYPES.InventoryQuery) => {
    const res = await API.inventoryUpdateRow(data, params);
    if (res?.status === 'SUCCESS') inventoryDirectoryTreeRef?.current?.reload?.();
    return res;
  };

  /** TABLE：请求数据方法 */
  const fetchInventoryQueryTreeNodeAll = async (data: FETCH.Req<TYPES.InventoryQuery>) => {
    const res = await API.inventoryQueryTreeNodeAll(data);
    setInventoryDataSource(res?.rows);
    return res;
  };

  /** TOOLBAR: 分部分项清单表 */
  const excelUploadProRender = (
    <ExcelUploadPro
      onSubmitFinish={() => {
        inventoryDirectoryTreeRef?.current?.setTreeCurrent();
        inventoryDirectoryTreeRef?.current?.reload();
      }}
      onSubmit={API.inventoryReportUploadHandledExcel}
      workbookConfig={{ tableName: '分部分项清单' }}
      formAppendParams={serviceParams}
      importType="option"
      mode="single"
    />
  );

  /** 导出参数 */
  const exportParams = {
    _u: 'file:c5a91eb5985c4b37bdcbab09cba164a0.ureport.xml',
    _n: '分部分项清单列表',
    ...serviceParams,
  };

  const toolbar: TableToolbarDefine = {
    plusLevel: { triggerType: 'submit', onSubmit: fetchInventorySaveBlankRow },
    sort: { onSubmit: async (p) => await API.inventorySortSwap(p, productActionCurrent) },
    import: { triggerType: 'submit', trigger: excelUploadProRender },
    deleted: { onSubmit: API.inventoryDeleteByIds },
    copy: {
      onSubmit: async (data: FETCH.Paste) => await API.inventoryCopyByIds(data, { projectId, stageId }),
    },
    expandStart: {},
    export: {
      determineActionCurrent: false,
      onSubmit: jondaReportExcel,
      exportType: 'default',
      exportParams,
    },
  };

  /** 分部分项清单 */
  const generateTable: BaseTableProps<TYPES.InventoryItem, TYPES.InventoryQuery> = {
    persistenceKey: 'PAGES_CONSTRUCTIONCOST_COSTPREPARATION_INVENTORYLISTTABLE',
    service: {
      dataSourceRequest: fetchInventoryQueryTreeNodeAll,
      cellEditSaveRequest: fetchInventoryUpdateRow,
      manualRequest: !directoryId || !stageId,
      params: serviceParams,
    },
    columns: useTableColumns({ auditStatus }),
    onActionCurrent: setInventoryActionCurrent,
    onSelections: setInventorySelection,
    onCurrent: setInventoryCurrent,
    actionRef: inventoryTableRef,
    toolbarAuthority: readonly,
    cellEditable: !readonly,
    calcTotal: true,
    expandable: {},
    search: false,
    toolbarLast,
    toolbar,
    ...tableProps,
  };

  return <BaseTable {...generateTable} />;
};
