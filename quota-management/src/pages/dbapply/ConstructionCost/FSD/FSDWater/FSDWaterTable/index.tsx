/*
 * @Author: SHUANG
 * @Date: 2024-04-16 15:32:15
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-24 16:11:45
 * @Description: 工程造价-风水电 价区及供水点
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

  const { FSDWaterTableRef } = props;
  const { setFsdWaterCurrent } = props;

  /** 工程ID 阶段ID */
  const matId = fsdCurrent?.id || '';
  const stageId = fsdCurrent?.stageId || '';
  const projectId = fsdCurrent?.projectId || '';

  const serviceParams = { matId, stageId, projectId };

  /** 运杂费用表 TOOLBAR */
  const toolbar: TableToolbarDefine<TYPES.FSDWaterItem> = {
    plusLevel: {
      onSubmit: (p, v1, v2, level) => API.fsdWaterSaveBlankRow({ ...p, level }, v1),
      triggerType: 'submit',
      disabled: !matId,
    },
    deleted: { onSubmit: API.fsdWaterDeleteByIds, disabled: !matId },
    calc: { onSubmit: API.fsdWaterCompute, disabled: !matId },
    expand: { buttonText: '全部' },
  };

  /** 运杂费用表 */
  const generateTable: BaseTableProps<TYPES.FSDWaterItem, TYPES.FSDWaterQuery> = {
    persistenceKey: 'PAGES_DBAPPLY_CONSTRUCTIONCOST_FSDWATER_TABLE',
    service: {
      dataSourceRequest: async (p) => {
        const res = await API.fsdWaterQueryTreeNodeAll(p);
        if (res?.status === 'SUCCESS') FSDMainTableRef?.current?.reload?.();
        return res;
      },
      cellEditSaveRequest: API.fsdWaterUpdateRow,
      manualRequest: !matId,
      params: serviceParams,
    },
    onCurrent: setFsdWaterCurrent,
    actionRef: FSDWaterTableRef,
    columns: useTableColumns,
    cellEditable: true,
    pagination: false,
    search: false,
    expandable: {},
    toolbar,
  };

  return <BaseTable {...generateTable} />;
};
