/*
 * @Author: SHUANG
 * @Date: 2024-04-16 11:56:10
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-26 11:27:53
 * @Description: 工程造价-风水电
 */
import { useEffect, useState } from 'react';
import BaseTable from 'jd-framework-web/package/components/BaseTable';
import { BaseTableProps, TableToolbarDefine } from 'jd-framework-web/package/components';
import { ConstructionCostProps } from '../../typings';
import { FsdProps, MatTypeKey } from '../typings';
import useTableColumns from './useTableColumns';
import * as TYPES from './typings';
import * as API from './services';

export default (props: ConstructionCostProps & FsdProps) => {
  /** 当前产品 */
  const { setFsdCurrent } = props;
  const { FSDMainTableRef } = props;

  const { productActionCurrent } = props;
  const { matType: matTypeProps } = props;

  const { FSDMainTableProps } = props;

  /** 工程ID 阶段ID */
  const stageId = productActionCurrent?.id || '';
  const projectId = productActionCurrent?.projectId || '';

  const [matType, setMatType] = useState<MatTypeKey | undefined>(matTypeProps);

  useEffect(() => {
    if (matTypeProps !== matType) {
      setMatType(matTypeProps);
    }
  }, [matTypeProps]);

  /** 运杂费用表 TOOLBAR */
  const toolbar: TableToolbarDefine<TYPES.FsdItem> = {
    plusLine: { onSubmit: API.fsdSaveBlankRow },
    deleted: { onSubmit: API.fsdDeleteByIds },
  };

  /** 运杂费用表 */
  const generateTable: BaseTableProps<TYPES.FsdItem, TYPES.FsdQuery> = {
    persistenceKey: 'PAGES_DBAPPLY_CONSTRUCTIONCOST_FSD_MAIN_TABLE',
    service: {
      dataSourceRequest: API.fsdQueryPageInfo,
      cellEditSaveRequest: API.fsdUpdateRow,
      params: { projectId, stageId, matType },
      manualRequest: !matType,
    },
    columns: useTableColumns({ matType }),
    actionRef: FSDMainTableRef,
    onCurrent: setFsdCurrent,
    cellEditable: true,
    search: false,
    toolbar,
    ...FSDMainTableProps,
  };

  return <BaseTable {...generateTable} />;
};
