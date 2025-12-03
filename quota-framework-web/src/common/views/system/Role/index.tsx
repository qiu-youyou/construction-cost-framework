/*
 * @Author: SHUANG
 * @Date: 2022-08-21 09:56:12
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-01-15 16:03:40
 * @Description:
 */
import { useState } from 'react';
import { BaseTableProps, TableToolbarDefine } from '../../../../components/BaseTable/typings';
import useAuthButton from '../../../../utils/auth/useAuthButton';

import ViewContainer from '../../../../components/ViewContainer';
import BaseTable from '../../../../components/BaseTable';
import AuthData from './components/AuthData';
import AuthSave from './components/AuthSave';

import useTableColumns from './useTableColumns';
import useFormColumns from './useFormColumns';
import * as TYPES from './typings';
import * as API from './services';

const Role: React.FC = () => {
  const { auth } = useAuthButton();
  /** 当前角色 */
  const [currentRole, setCurrentRole] = useState<TYPES.RoleListItem>();

  /** 生成 Table */
  const toolbar: TableToolbarDefine<TYPES.RoleActionItem> = {
    plus: { buttonText: '新增角色', columns: useFormColumns, onSubmit: API.roleSave },
    edit: { modalTitle: '编辑角色', columns: useFormColumns, onSubmit: API.roleSave },
    enable: { onSubmit: API.roleUpdateStatusByIds },
    disable: { onSubmit: API.roleUpdateStatusByIds },
    deleted: {
      actionControl: { key: 'billStatus', value: '3', message: '启用状态的数据不允许删除!', equal: true },
      onSubmit: API.roleDeleteByIds,
    },
  };

  /** 分配 菜单、数据权限 */
  const toolbarAfter = (
    <>
      {auth('allocate_menu') && <AuthSave roleId={currentRole?.id} />}
      {auth('allocate_data') && <AuthData roleId={currentRole?.id} />}
    </>
  );

  const generateTable: BaseTableProps<TYPES.RoleListItem> = {
    persistenceKey: 'COMMONVIEWSSYSTEMROLETABLE',
    service: { dataSourceRequest: API.roleQueryPageInfo },
    onActionCurrent: (record) => setCurrentRole(record),
    rowSelection: { columnWidth: 20 },
    columns: useTableColumns,
    toolbarAuthority: true,
    virtual: false,
    toolbarAfter,
    toolbar,
  };

  return (
    <ViewContainer>
      <BaseTable {...generateTable} />
    </ViewContainer>
  );
};

export default Role;
