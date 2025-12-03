/*
 * @Author: SHUANG
 * @Date: 2023-07-21 13:37:41
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-02-26 09:56:30
 * @Description: 组织机构
 */
import {
  ClusterOutlined,
  DeploymentUnitOutlined,
  GlobalOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Button, message } from 'antd';
import { useRef, useState } from 'react';
import { FileImageOutlined } from '@ant-design/icons';

import {
  BaseTableProps,
  TableToolbarDefine,
  TableActionType,
} from '../../../../components/BaseTable/typings';
import BaseTree from '../../../../components/BaseTree';
import BaseCard from '../../../../components/BaseCard';
import BaseTable from '../../../../components/BaseTable';
import ViewContainer from '../../../../components/ViewContainer';
import { BaseTreeProps } from '../../../../components/BaseTree/typings';
import SplitPane, { PaneContainer } from '../../../../components/SplitPane';
import EditButton from '../../../../components/ActionButton/EditButton';

import useUploadColumns from './useUploadColumns';
import * as TYPES from './typings';
import * as API from './services';

import { attachmentUpload } from '../../../annex/AnnexTable/services';
import StatusText from '../../../textTag/StatusText';

/** 使用 USER表 和 ROLE表 */

import { RoleListItem } from '../Role/typings';
import useRoleTableColumns from '../Role/useOrgRoleTableColumns';
import useAuthButton from '../../../../utils/auth/useAuthButton';

import { userSave } from '../User/services';
import { UserListItem } from '../User/typings';
import useUserFormColumns from '../User/useFormColumns';
import useUserTableColumns from '../User/useTableColumns';
import RoleSave from './components/RoleSave';
import UserSave from './components/UserSave';
import useFormColumns from './useFormColumns';
import SignatureView from './components/SignatureView';

const Organ: React.FC = () => {
  const { auth } = useAuthButton();
  /** states */
  const [currentOrgan, setCurrentOrgan] = useState<TYPES.OrganListItem>();

  const userTableActionRef = useRef<TableActionType>();
  const roleTableActionRef = useRef<TableActionType>();

  /** 保存用户授权 */
  const onSubmitUserSave = async (selection: UserListItem[]) => {
    const res = await API.orgUserSave({
      orgId: currentOrgan?.id || '',
      'userIds[]': selection.map((item) => item.id),
    });
    userTableActionRef?.current?.reload?.();
    return res;
  };

  /** 保存角色授权 */
  const onSubmitRoleSave = async (selection: RoleListItem[]) => {
    const res = await API.orgRoleSave({
      orgId: currentOrgan?.id || '',
      'roleIds[]': selection.map((item) => item.id),
    });
    roleTableActionRef?.current?.reload?.();
    return res;
  };

  /**  生成 Tree */
  const modalProps = { defaultFullScreen: false, width: 560, title: '查看公章' };
  const treeActionButton: TableToolbarDefine<TYPES.OrgActionItem> = {
    plusLevel: {
      authKey: 'plus',
      modalTitle: '新增组织机构',
      columns: useFormColumns('plus'),
      onSubmit: API.orgSave,
    },
    edit: { modalTitle: '编辑组织机构', columns: useFormColumns('edit'), onSubmit: API.orgSave },
    details: { buttonText: '查看公章', modalProps, render: <SignatureView currentOrgan={currentOrgan} /> },
    enable: { onSubmit: API.orgUpdateStatusByIds },
    disable: { onSubmit: API.orgUpdateStatusByIds },
    deleted: {
      actionControl: { key: 'billStatus', value: '3', message: '启用状态的数据不允许删除!', equal: true },
      onSubmit: API.orgDeleteByIds,
    },
  };

  const orgTypeIconMap: { [index: string]: any } = {
    0: <GlobalOutlined />, // 集团
    1: <ClusterOutlined />, // 公司
    2: <DeploymentUnitOutlined />, // 装置
    3: <TeamOutlined />, // 部门
    4: <UserOutlined />, // 岗位
  };

  /** tree */

  /** 保存签名 */
  const handleAttachmentUpload = async (params: FETCH.Req) => {
    if (!params?.file) message.warning('暂无文件可上传！');
    const formData = new FormData();
    formData.append('businessType', 'ORG');
    formData.append('file', params?.file || '');
    formData.append('beanName', 'signatureServiceImpl');
    formData.append('businessId', currentOrgan?.id || '');
    return await attachmentUpload(formData);
  };

  const buttonTrigger = (
    <Button className="DetailsButtonLink">
      <FileImageOutlined /> 上传公章
    </Button>
  );

  /** 上传签名 */
  const generateActionAfter = (
    <EditButton
      current={currentOrgan}
      trigger={buttonTrigger}
      columns={useUploadColumns}
      onSubmit={handleAttachmentUpload}
    />
  );

  const generateTree: BaseTreeProps<TYPES.OrganListItem> = {
    height: 780,
    checkable: true,
    localRetrieval: true,
    defaultExpandAll: true,
    toolbarAuthority: true,
    toolbar: treeActionButton,
    toolbarAfter: auth('official_seal') && generateActionAfter,
    service: { dataSourceRequest: API.orgQueryTreeNodeAll },
    onCurrent: (record) => setCurrentOrgan(record),
    fieldNames: { key: 'id', children: 'chidren', title: 'orgName' },
    titleRender: ({ orgType, orgName, billStatus, signature }) => [
      <span key="type" style={{ marginRight: 1 }}>
        {orgTypeIconMap[orgType]}
      </span>,
      <span key="name">{orgName}</span>,
      <StatusText key="status" type="text" status={billStatus} />,
      <span style={{ color: '#1b63ab', marginLeft: 5 }}>{!!signature && '(有公章)'}</span>,
    ],
  };

  /** 生成 组织机构用户 Table */
  const userTableToolbar = {
    edit: {
      modalTitle: '编辑用户',
      authkey: 'auth_user_edit',
      columns: useUserFormColumns(),
      schemaFormProps: { grid: true, colProps: { span: 12 } },
      modalProps: { width: 900 },
      onSubmit: userSave,
    },
    deleted: { buttonText: '取消授权', authkey: 'auth_user_cancel', onSubmit: API.orgUserDeleteByIds },
  };

  const generateUserTable: BaseTableProps<TYPES.OrganUserListItem, TYPES.OrganUserListParams> = {
    persistenceKey: 'COMMONVIEWSSYSTEMORGANUSERTABLE',
    service: {
      manualRequest: !currentOrgan?.id,
      params: { orgId: currentOrgan?.id || '' },
      dataSourceRequest: API.orgUserQueryPageInfo,
    },
    toolbarBefore: auth('auth_user') && (
      <UserSave onSubmit={onSubmitUserSave} orgId={currentOrgan?.id || ''} />
    ),
    actionRef: userTableActionRef,
    columns: useUserTableColumns,
    toolbar: userTableToolbar,
    toolbarAuthority: true,
    toolbarAfter: true,
  };

  /** 生成 组织机构角色 Table */
  const roleTableToolbar = {
    deleted: { authkey: 'auth_role_cancel', buttonText: '取消授权', onSubmit: API.orgRoleDeleteByIds },
  };

  const generateRoleTable: BaseTableProps<TYPES.OrganRoleListItem, TYPES.OrganRoleListParams> = {
    persistenceKey: 'COMMONVIEWSSYSTEMORGANROLEsTABLE',
    service: {
      dataSourceRequest: API.orgRoleQueryPageInfo,
      params: { orgId: currentOrgan?.id || '' },
      manualRequest: !currentOrgan?.id,
    },
    toolbarBefore: auth('auth_role') && (
      <RoleSave onSubmit={onSubmitRoleSave} orgId={currentOrgan?.id || ''} />
    ),
    rowSelection: { columnWidth: 20 },
    actionRef: roleTableActionRef,
    columns: useRoleTableColumns,
    toolbar: roleTableToolbar,
    toolbarAuthority: true,
    virtual: false,
  };

  const tabPaneItems = [
    { key: 'users', label: '人员管理', children: <BaseTable {...generateUserTable} /> },
    { key: 'roles', label: '角色管理', children: <BaseTable {...generateRoleTable} /> },
  ];

  return (
    <ViewContainer>
      <SplitPane>
        <PaneContainer width={400}>
          <BaseCard title="组织机构">
            <BaseTree {...generateTree} />
          </BaseCard>
        </PaneContainer>
        <PaneContainer flex>
          <BaseCard title="组织机构授权" tabs={{ items: tabPaneItems }} />
        </PaneContainer>
      </SplitPane>
    </ViewContainer>
  );
};

export default Organ;
