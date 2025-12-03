/*
 * @Author: SHUANG
 * @Date: 2024-04-16 15:32:15
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-25 14:58:30
 * @Description: 工程造价-风水电 供电点信息
 */
import BaseTable from 'jd-framework-web/package/components/BaseTable';
import { BaseTableProps, TableToolbarDefine } from 'jd-framework-web/package/components';
import useTableColumns from './useTableColumns';
import { FsdProps } from '../../typings';
import * as TYPES from '../typings';
import * as API from '../services';

export default (props: FsdProps) => {
  /** 当前产品 */
  const { fsdCurrent } = props;
  const { FSDMainTableRef } = props;

  const { FSDElectricityTableRef } = props;
  const { setFsdElectricityCurrent } = props;

  /** 工程ID 阶段ID */
  const matId = fsdCurrent?.id || '';
  const stageId = fsdCurrent?.stageId || '';
  const projectId = fsdCurrent?.projectId || '';

  const serviceParams = { matId, stageId, projectId };

  /** 运杂费用表 TOOLBAR */
  const toolbar: TableToolbarDefine<TYPES.FSDElectricityItem> = {
    plusLine: { onSubmit: API.fsdElectricitySaveBlankRow, disabled: !matId },
    deleted: { onSubmit: API.fsdElectricityDeleteByIds, disabled: !matId },
    calc: { onSubmit: API.fsdElectricityCompute, disabled: !matId },
  };

  /** 运杂费用表 */
  const generateTable: BaseTableProps<TYPES.FSDElectricityItem, TYPES.FSDElectricityQuery> = {
    persistenceKey: 'PAGES_DBAPPLY_CONSTRUCTIONCOST_FSDELECTRICITY_TABLE',
    service: {
      dataSourceRequest: async (p) => {
        const res = await API.fsdElectricityQueryPageInfo(p);
        if (res?.status === 'SUCCESS') FSDMainTableRef?.current?.reload?.();
        return res;
      },
      cellEditSaveRequest: API.fsdElectricityUpdateRow,
      manualRequest: !matId,
      params: serviceParams,
    },
    onCurrent: setFsdElectricityCurrent,
    actionRef: FSDElectricityTableRef,
    columns: useTableColumns,
    cellEditable: true,
    search: false,
    toolbar,
  };

  return <BaseTable {...generateTable} />;
};
