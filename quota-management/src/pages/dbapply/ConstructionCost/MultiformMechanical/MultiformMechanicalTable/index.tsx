/*
 * @Author: SHUANG
 * @Date: 2024-03-25 13:56:41
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-03 13:47:57
 * @Description: 工程造价-组时机械定义
 */

import { BaseTableProps, TableToolbarDefine } from 'jd-framework-web/package/components';
import BaseTable from 'jd-framework-web/package/components/BaseTable';

import { ConstructionCostProps } from '../../typings';
import { MultiformMechanicalProps } from '../typings';
import useTableColumns from './useTableColumns';
import * as TYPES from './typings';
import * as API from './services';

export default (props: ConstructionCostProps & MultiformMechanicalProps) => {
  const { readonly } = props;
  const { tableProps } = props;
  /** 分部分项清单明细表 当前选中 */
  const { productActionCurrent } = props;

  const { multiformMechanicalTableRef } = props;

  const { setMultiformMechanicalCurrent } = props;

  /** 工程ID 阶段ID */
  const projectId = productActionCurrent?.projectId || '';
  const stageId = productActionCurrent?.id || '';

  /** SERVICE 参数 */
  const serviceParams = { projectId, stageId };

  /** 组时机械定义 操作栏 */
  const toolbar: TableToolbarDefine<TYPES.MultiformMechanicalItem> = {
    plusLine: { onSubmit: API.multiformMechanicalSaveBlankRow },
    deleted: { onSubmit: API.multiformMechanicalDeleteByIds },
  };

  /** 组时机械定义 表 */
  const generateTable: BaseTableProps<TYPES.MultiformMechanicalItem, TYPES.MultiformMechanicalQuery> = {
    persistenceKey: 'PAGES_DBAPPLY_CONSTRUCTIONCOST_MULTIFORMMECHANICAL_TABLE',
    service: {
      dataSourceRequest: API.multiformMechanicalQueryPageInfo,
      cellEditSaveRequest: API.multiformMechanicalUpdateRow,
      manualRequest: !stageId,
      params: serviceParams,
    },
    onCurrent: setMultiformMechanicalCurrent,
    actionRef: multiformMechanicalTableRef,
    rowSelection: { columnWidth: 40 },
    toolbarAuthority: readonly,
    columns: useTableColumns,
    cellEditable: !readonly,
    search: false,
    toolbar,
    ...tableProps,
  };

  return <BaseTable {...generateTable} />;
};
