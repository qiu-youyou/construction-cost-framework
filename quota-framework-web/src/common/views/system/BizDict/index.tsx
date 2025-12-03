/*
 * @Author: SHUANG
 * @Date: 2022-08-17 15:50:35
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-10-16 16:41:27
 * @Description: 业务字典
 */
import BaseTable from '../../../../components/BaseTable';
import { BaseTableProps, TableToolbarDefine } from '../../../../components/BaseTable/typings';
import ViewContainer from '../../../../components/ViewContainer';

import useTableColumns from './useTableColumns';
import useFormColumns from './useFormColumns';
import * as TYPES from './typings';
import * as API from './services';

export default () => {
  const schemaFormProps = { labelCol: { span: 8 }, wrapperCol: { span: 14 } };

  const toolbar: TableToolbarDefine<TYPES.BusinessDictListItem> = {
    plus: {
      modalTitle: '新增业务字典',
      columns: useFormColumns,
      onSubmit: API.businessDictSave,
      schemaFormProps,
    },
    edit: {
      modalTitle: '编辑业务字典',
      columns: useFormColumns,
      onSubmit: API.businessDictSave,
      schemaFormProps,
    },
    enable: { onSubmit: API.businessDictUpdateStatusByIds },
    disable: { onSubmit: API.businessDictUpdateStatusByIds },
    deleted: {
      actionControl: { key: 'billStatus', value: '3', message: '启用状态的数据不允许删除!', equal: true },
      onSubmit: API.businessDistDeleteByIds,
    },
  };

  const generateDictClassTable: BaseTableProps<TYPES.BusinessDictListItem> = {
    persistenceKey: 'COMMONVIEWSSYSTEMBIZDICTTABLE',
    service: { dataSourceRequest: API.businessDictQueryPageInfo },
    columns: useTableColumns,
    toolbarAuthority: true,
    toolbar,
  };

  return (
    <ViewContainer>
      <BaseTable {...generateDictClassTable} />
    </ViewContainer>
  );
};
