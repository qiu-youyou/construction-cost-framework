/*
 * @Author: SHUANG
 * @Date: 2023-07-27 15:11:18
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-11-02 09:58:06
 * @Description:
 */
import { BaseTableProps } from '@/components/BaseTable/typings';
import ViewContainer from '@/components/ViewContainer';
import { testQueryPageInfo, testSave } from './services';
import useTablecolumns from './useTableColumns';
import BaseTable from '@/components/BaseTable';

export default () => {
  const generateTable: BaseTableProps<any> = {
    persistenceKey: 'DEMOTABLE',
    service: { dataSourceRequest: testQueryPageInfo, cellEditSaveRequest: testSave },
    columns: useTablecolumns,
    cellEditable: true,
    rowSelection: false,
    columnSortable: true,
  };

  return (
    <ViewContainer>
      <BaseTable {...generateTable} />
    </ViewContainer>
  );
};
