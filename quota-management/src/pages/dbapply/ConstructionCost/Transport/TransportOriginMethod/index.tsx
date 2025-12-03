/*
 * @Author: SHUANG
 * @Date: 2024-04-15 17:35:12
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-22 14:02:19
 * @Description: 工程造价-运保杂费计算 来源地 运输方式
 */
import BaseTable from 'jd-framework-web/package/components/BaseTable';
import { BaseTableProps, TableToolbarDefine } from 'jd-framework-web/package/components';
import TransportOriginFreight from './TransportOriginFreight';
import TransportOriginSundry from './TransportOriginSundry';
import { ConstructionCostProps } from '../../typings';
import useTableColumns from './useTableColumns';
import { TransportProps } from '../typings';
import * as TYPES from './typings';
import * as API from './services';

export default (props: ConstructionCostProps & TransportProps) => {
  /** 当前产品 */
  const { transportOriginCurrent } = props;
  const { transportOriginMethodTableRef } = props;

  /** 工程ID 阶段ID */
  const oriId = transportOriginCurrent?.id || '';
  const traId = transportOriginCurrent?.traId || '';
  const stageId = transportOriginCurrent?.stageId || '';
  const projectId = transportOriginCurrent?.projectId || '';

  /** 当前运输方式 */
  const { setTransportOriginMethodCurrent } = props;

  /** 运费计算 */
  const { transportOriginTrainRef, transportOriginFreightRef } = props;

  const toolbar: TableToolbarDefine = {
    plusLine: { trigger: <TransportOriginSundry {...props} />, triggerType: 'submit' },
    plus: { trigger: <TransportOriginFreight {...props} />, triggerType: 'submit' },
  };

  /** 根据运输方式 计算不同运费 */
  const handleOnDoubleClick: any = (record: TYPES.TransportOriginMethodItem) => {
    if (record?.metName == '铁路') transportOriginTrainRef?.current?.open?.();
    else transportOriginFreightRef?.current?.open?.();
    return { trigger: 'none' };
  };

  /** 运杂费用表 */
  const generateTable: BaseTableProps<TYPES.TransportOriginMethodItem, TYPES.TransportOriginMethodQuery> = {
    persistenceKey: 'PAGES_DBAPPLY_CONSTRUCTIONCOST_TRANSPORT_ORIGIN_METHOD_TABLE',
    service: {
      dataSourceRequest: API.transportOriginMethodQueryPageInfo,
      cellEditSaveRequest: API.transportOriginMethodUpdateRow,
      params: { projectId, stageId, traId, oriId },
      manualRequest: !oriId,
    },
    onCurrent: setTransportOriginMethodCurrent,
    actionRef: transportOriginMethodTableRef,
    onDoubleClick: handleOnDoubleClick,
    columns: useTableColumns,
    rowSelection: false,
    cellEditable: true,
    pagination: false,
    search: false,
    toolbar,
  };

  return <BaseTable {...generateTable} />;
};
