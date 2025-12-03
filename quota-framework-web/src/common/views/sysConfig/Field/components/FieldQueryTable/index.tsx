/*
 * @Author: SHUANG
 * @Date: 2023-08-01 11:44:12
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-10-13 15:45:10
 * @Description: 高级查询管理
 */
import BaseTable from '../../../../../../components/BaseTable';
import { BaseTableProps, TableToolbarDefine } from '../../../../../../components/BaseTable/typings';
import { FieldClassListItem, FieldQueryListItem } from '../../typings';
import useTableColumns from './useTableColumns';
import useFormColumns from './useFormColumns';
import {
  customQueryUpdateStatusByIds,
  customQueryQueryPageInfo,
  customQueryDeleteByIds,
  customQuerySave,
} from '../../services';

type Props = { classCurrent?: FieldClassListItem };

const actionProps = {
  schemaFormProps: { grid: true, colProps: { span: 24 } },
  modalProps: { width: 460 },
};

export default (props: Props) => {
  /** 当前目录 */
  const { classCurrent } = props;

  /** 自定义查询操作 */
  const toolbar: TableToolbarDefine<FieldQueryListItem> = {
    plus: { columns: useFormColumns, ...actionProps, onSubmit: customQuerySave },
    edit: { columns: useFormColumns, ...actionProps, onSubmit: customQuerySave },
    enable: { onSubmit: customQueryUpdateStatusByIds },
    disable: { onSubmit: customQueryUpdateStatusByIds },
    deleted: {
      actionControl: { key: 'billStatus', value: '3', message: '启用状态的数据不允许删除!', equal: true },
      onSubmit: customQueryDeleteByIds,
    },
  };

  /** 自定义查询列表 根据目录id 进行查询 目录ID */
  const generateTable: BaseTableProps<FieldQueryListItem, { businessId?: string }> = {
    persistenceKey: 'COMMONVIEWSCONFIGFIELDQUERYTABLE',
    service: {
      dataSourceRequest: customQueryQueryPageInfo,
      params: { businessId: classCurrent?.id },
      manualRequest: !classCurrent?.id,
    },
    columns: useTableColumns,
    toolbarAuthority: true,
    virtual: false,
    toolbar,
  };

  return <BaseTable {...generateTable} />;
};
