/*
 * @Author: SHUANG
 * @Date: 2024-03-26 17:03:20
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-03-29 09:59:02
 * @Description: 工程造价-工程量清单编制-分部分项清单表 批量应用历史项目清单
 */

import { BaseTableProps } from 'jd-framework-web/package/components';
import BaseTable from 'jd-framework-web/package/components/BaseTable';

import { HistoryProjectInventoryProps, ProjectSearchItem } from '../typings';
import { productQueryProductAndProject } from '../services';
import useTableColumns from './useTableColumns';

export default (props: HistoryProjectInventoryProps) => {
  const { setProjectSearchCurrent } = props;

  /** 查询项目阶段表 */
  const generateTable: BaseTableProps<ProjectSearchItem> = {
    persistenceKey: 'PAGES_DBAPPLY_COSTPREPARATION_INVENTORY_PROJECTSEARCH_TABLE',
    service: { dataSourceRequest: productQueryProductAndProject },
    onCurrent: setProjectSearchCurrent,
    columns: useTableColumns,
    rowSelection: false,
    virtual: false,
  };

  return <BaseTable {...generateTable} />;
};
