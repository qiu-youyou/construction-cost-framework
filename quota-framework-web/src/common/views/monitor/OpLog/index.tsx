/*
 * @Author: SHUANG
 * @Date: 2022-08-18 15:46:08
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-11-22 14:27:45
 * @Description: 操作日志
 */

import BaseTable from '../../../../components/BaseTable';
import { BaseTableProps } from '../../../../components/BaseTable/typings';
import ViewContainer from '../../../../components/ViewContainer';

import useTableColumns from './useTableColumns';
import * as TYPES from './typings';
import * as API from './services';

export default () => {
  /** 生成 Table */
  const generateDictClassTable: BaseTableProps<TYPES.OpLogListItem> = {
    persistenceKey: 'COMMONVIEWSCONITOROPLOGTABLE',
    service: { dataSourceRequest: API.logOperationQueryCurrentPageInfo },
    // toolbar: { deleted: { onSubmit: API.logOperationDeleteByIds } },
    columns: useTableColumns,
    rowKey: false,
  };

  return (
    <ViewContainer>
      <BaseTable {...generateDictClassTable} />
    </ViewContainer>
  );
};
