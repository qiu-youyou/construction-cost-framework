/*
 * @Author: SHUANG
 * @Date: 2024-04-11 10:11:40
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-23 14:53:23
 * @Description: 工程造价-运保杂费计算 来源地
 */
import BaseTable from 'jd-framework-web/package/components/BaseTable';
import { BaseTableProps, TableToolbarDefine } from 'jd-framework-web/package/components';
import { ConstructionCostProps } from '../../typings';
import useTableColumns from './useTableColumns';
import { TransportProps } from '../typings';
import * as TYPES from './typings';
import * as API from './services';

export default (props: ConstructionCostProps & TransportProps) => {
  /** 当前产品 */
  const { transportMainCurrent } = props;
  const { transportOriginTableRef } = props;
  const { setTransportOriginCurrent } = props;

  /** 工程ID 阶段ID */
  const traId = transportMainCurrent?.id || '';
  const stageId = transportMainCurrent?.stageId || '';
  const projectId = transportMainCurrent?.projectId || '';
  const traTaxRate = transportMainCurrent?.traTaxRate || 0;

  /** 运杂费用表 TOOLBAR */
  const toolbar: TableToolbarDefine<TYPES.TransportOriginItem> = {
    plusLine: { onSubmit: API.transportOriginSaveBlankRow, disabled: !traId },
    deleted: { onSubmit: API.transportOriginDeleteByIds, disabled: !traId },
    sort: { onSubmit: async (p) => await API.transportOriginSortSwap(p, { projectId, stageId, traId }) },
    copy: {
      onSubmit: async (data: FETCH.Paste, _, sele) =>
        await API.transportOriginCopyByIds(data, { projectId, stageId, traId },sele),
    },
  };

  /** 运杂费用表 */
  const generateTable: BaseTableProps<TYPES.TransportOriginItem, TYPES.TransportOriginQuery> = {
    persistenceKey: 'PAGES_DBAPPLY_CONSTRUCTIONCOST_TRANSPORT_ORIGIN_TABLE',
    service: {
      dataSourceRequest: API.transportOriginQueryPageInfo,
      cellEditSaveRequest: API.transportOriginUpdateRow,
      params: { projectId, stageId, traId, traTaxRate },
      manualRequest: !traId,
    },
    onCurrent: setTransportOriginCurrent,
    actionRef: transportOriginTableRef,
    columns: useTableColumns,
    cellEditable: true,
    search: false,
    toolbar,
  };

  return <BaseTable {...generateTable} />;
};
