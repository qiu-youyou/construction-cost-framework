/*
 * @Author: SHUANG
 * @Date: 2024-04-16 15:32:15
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-25 13:48:34
 * @Description: 工程造价-风水电 供风点信息
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
  const { FSDWindTableRef } = props;
  const { setFsdWindCurrent } = props;

  /** 工程ID 阶段ID */
  const matId = fsdCurrent?.id || '';
  const stageId = fsdCurrent?.stageId || '';
  const projectId = fsdCurrent?.projectId || '';

  const serviceParams = { matId, stageId, projectId };

  /** 运杂费用表 TOOLBAR */
  const toolbar: TableToolbarDefine<TYPES.FSDWindItem> = {
    plusLine: { onSubmit: API.fsdWinSaveBlankRow, disabled: !matId },
    deleted: { onSubmit: API.fsdWinDeleteByIds, disabled: !matId },
    calc: { onSubmit: API.fsdWinCompute, disabled: !matId },
  };

  /** 运杂费用表 */
  const generateTable: BaseTableProps<TYPES.FSDWindItem, TYPES.FSDWindQuery> = {
    persistenceKey: 'PAGES_DBAPPLY_CONSTRUCTIONCOST_FSDWIND_TABLE',
    service: {
      dataSourceRequest: async (p) => {
        const res = await API.fsdWinQueryPageInfo(p);
        if (res?.status === 'SUCCESS') FSDMainTableRef?.current?.reload?.();
        return res;
      },
      cellEditSaveRequest: API.fsdWinUpdateRow,
      manualRequest: !matId,
      params: serviceParams,
    },
    onCurrent: setFsdWindCurrent,
    actionRef: FSDWindTableRef,
    columns: useTableColumns,
    cellEditable: true,
    search: false,
    toolbar,
  };

  return <BaseTable {...generateTable} />;
};
