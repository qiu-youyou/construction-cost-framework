/*
 * @Author: SHUANG
 * @Date: 2023-08-01 11:44:52
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-01-15 15:56:46
 * @Description: 自定排序
 */
import BaseTable from '../../../../../../components/BaseTable';
import { BaseTableProps, TableToolbarDefine } from '../../../../../../components/BaseTable/typings';
import { FieldClassListItem, FieldSortListItem } from '../../typings';
import useTableColumns from './useTableColumns';
import useFormColumns from './useFormColumns';
import {
  customSortUpdateStatusByIds,
  customSortQueryPageInfo,
  customSortDeleteByIds,
  customSortSave,
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
  const toolbar: TableToolbarDefine<FieldSortListItem> = {
    plus: { columns: useFormColumns, ...actionProps, onSubmit: customSortSave },
    edit: { columns: useFormColumns, ...actionProps, onSubmit: customSortSave },
    enable: { onSubmit: customSortUpdateStatusByIds },
    disable: { onSubmit: customSortUpdateStatusByIds },
    deleted: {
      actionControl: { key: 'billStatus', value: '3', message: '启用状态的数据不允许删除!', equal: true },
      onSubmit: customSortDeleteByIds,
    },
  };

  /** 自定义查询列表 根据目录id 进行查询 目录ID */
  const generateTable: BaseTableProps<FieldSortListItem, { businessId?: string }> = {
    persistenceKey: 'COMMONVIEWSCONFIGFIELDSORTTABLE',
    service: {
      dataSourceRequest: customSortQueryPageInfo,
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
