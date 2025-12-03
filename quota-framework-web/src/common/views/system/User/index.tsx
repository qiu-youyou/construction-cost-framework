/*
 * @Author: SHUANG
 * @Date: 2022-07-18 10:53:18
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-01-31 11:08:26
 * @Description: 用户管理
 */
import { useState, useRef } from 'react';

import {
  BaseTableProps,
  TableToolbarDefine,
  TableActionType,
} from '../../../../components/BaseTable/typings';
import BaseTable from '../../../../components/BaseTable';
import ViewContainer from '../../../../components/ViewContainer';
import UploadSignature from './components/UploadSignature';
import UserByOrgRole from './components/UserByOrgRole';

import useAuthButton from '../../../../utils/auth/useAuthButton';

import useTableColumns from './useTableColumns';
import useFormColumns from './useFormColumns';
import * as TYPES from './typings';
import * as API from './services';
import UserRestPwd from './components/UserRestPwd';

const actionProps = {
  schemaFormProps: { grid: true, colProps: { span: 12 } },
  modalProps: { width: 800 },
};

const User: React.FC = () => {
  const { auth } = useAuthButton();
  const tableAction = useRef<TableActionType>();
  const tableReload = () => tableAction?.current?.reload?.();
  const [tableActionCurrent, setTableActionCurrent] = useState<TYPES.UserListItem>();

  /** 生成 Table */
  const toolbar: TableToolbarDefine<TYPES.UserActionItem> = {
    plus: { buttonText: '新增用户', columns: useFormColumns(), onSubmit: API.userSave, ...actionProps },
    edit: { modalTitle: '编辑用户', columns: useFormColumns(), onSubmit: API.userSave, ...actionProps },
    enable: { onSubmit: API.userUpdateStatusByIds },
    disable: { onSubmit: API.userUpdateStatusByIds },
    deleted: {
      actionControl: { key: 'billStatus', value: '3', message: '启用状态的数据不允许删除!', equal: true },
      onSubmit: API.userDeleteByIds,
    },
  };

  const toolbarAfter = [
    /** 上传签名 */
    auth('signature') && <UploadSignature reload={tableReload} tableActionCurrent={tableActionCurrent} />,
    /** 查看用户组织机构、角色 */
    auth('organization') && <UserByOrgRole tableActionCurrent={tableActionCurrent} />,

    /** 用户重置密码 */
    <span className="gap-wrapper">｜</span>,
    auth('resetpass') && <UserRestPwd type="random" tableActionCurrent={tableActionCurrent} />,
    auth('resetpass') && <UserRestPwd type="default" tableActionCurrent={tableActionCurrent} />,
  ];

  const generateTable: BaseTableProps<TYPES.UserListItem> = {
    service: { dataSourceRequest: API.userQueryPageInfo },
    persistenceKey: 'COMMONVIEWSSYSTEMUSERTABLE',
    onActionCurrent: (record) => setTableActionCurrent(record),
    columns: useTableColumns,
    actionRef: tableAction,
    toolbarAuthority: true,
    toolbarAfter,
    toolbar,
  };

  return (
    <ViewContainer>
      <BaseTable {...generateTable} />
    </ViewContainer>
  );
};

export default User;
