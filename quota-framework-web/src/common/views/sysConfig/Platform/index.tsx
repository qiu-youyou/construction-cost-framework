/*
 * @Author: SHUANG
 * @Date: 2023-07-24 09:44:05
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-01-15 15:50:54
 * @Description: 系统配置管理
 */

import BaseTable from '../../../../components/BaseTable';
import { BaseTableProps } from '../../../../components/BaseTable/typings';
import { TableToolbarDefine } from '../../../../components/BaseTable/typings';
import ViewContainer from '../../../../components/ViewContainer';

import useAuthButton from '../../../../utils/auth/useAuthButton';
import useTableColumns from './useTableColumns';
import useFormColumns from './useFormColumns';
import RefreshConfig from './RefreshConfig';
import * as TYPES from './typings';
import * as API from './services';

const actionProps = {
  schemaFormProps: { grid: true, colProps: { span: 24 } },
  modalProps: { width: 460 },
};

export default () => {
  const { auth } = useAuthButton();

  const toolbar: TableToolbarDefine<TYPES.SysConfigListItem> = {
    plus: { buttonText: '新增配置', columns: useFormColumns, ...actionProps, onSubmit: API.sysConfigSave },
    edit: { modalTitle: '编辑配置', columns: useFormColumns, ...actionProps, onSubmit: API.sysConfigSave },
    deleted: {
      actionControl: { key: 'billStatus', value: '3', message: '启用状态的数据不允许删除!', equal: true },
      onSubmit: API.sysConfigDeleteByIds,
    },
    disable: { onSubmit: API.sysConfigUpdateStatusByIds },
    enable: { onSubmit: API.sysConfigUpdateStatusByIds },
  };

  const generateTable: BaseTableProps<TYPES.SysConfigListItem> = {
    persistenceKey: 'COMMONVIEWSCONFIGPLATFORMTABLE',
    service: { dataSourceRequest: API.sysConfigQueryPageInfo },
    toolbarAfter: auth('reload') && <RefreshConfig />,
    rowSelection: { columnWidth: 32 },
    columns: useTableColumns,
    toolbarAuthority: true,
    virtual: false,
    toolbar,
  };

  return (
    <ViewContainer>
      <BaseTable {...generateTable} />
    </ViewContainer>
  );
};
