/*
 * @Author: SHUANG
 * @Date: 2024-04-10 15:36:30
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-23 14:50:02
 * @Description: 工程造价-运保杂费计算 运杂费用
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
  const { productActionCurrent } = props;
  const { transportMainTableRef } = props;
  const { setTransportMainCurrent } = props;

  const { transportMainTableProps } = props;

  /** 工程ID 阶段ID */
  const stageId = productActionCurrent?.id || '';
  const projectId = productActionCurrent?.projectId || '';

  /** 运杂费用表 TOOLBAR */
  const toolbar: TableToolbarDefine<TYPES.TransportItem> = {
    plusLine: { onSubmit: API.transportSaveBlankRow },
    deleted: { onSubmit: API.transportDeleteByIds },
    copy: { onSubmit: async (data) => await API.transportCopyByIds(data, { projectId, stageId }) },
    sort: { onSubmit: async (p) => await API.transportSortSwap(p, { projectId, stageId }) },
  };

  /** 运杂费用表 */
  const generateTable: BaseTableProps<TYPES.TransportItem, TYPES.TransportQuery> = {
    persistenceKey: 'PAGES_DBAPPLY_CONSTRUCTIONCOST_TRANSPORT_MAIN_TABLE',
    service: {
      dataSourceRequest: API.transportQueryPageInfo,
      cellEditSaveRequest: API.transportUpdateRow,
      params: { projectId, stageId },
      manualRequest: !stageId,
    },
    onCurrent: setTransportMainCurrent,
    actionRef: transportMainTableRef,
    columns: useTableColumns,
    cellEditable: true,
    search: false,
    toolbar,
    ...transportMainTableProps,
  };

  return <BaseTable {...generateTable} />;
};
