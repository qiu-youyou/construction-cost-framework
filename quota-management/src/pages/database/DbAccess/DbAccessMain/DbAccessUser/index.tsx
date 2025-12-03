/*
 * @Author: SHUANG
 * @Date: 2023-10-26 14:14:18
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-11-07 11:35:06
 * @Description: 定额库权限目录对应人员
 */
import { useRef } from 'react';
import { UserListItem } from 'jd-framework-web/package/common/views/system/User/typings';
import { BaseTableProps, TableActionType } from 'jd-framework-web/package/components';
import BaseTable from 'jd-framework-web/package/components/BaseTable';

import DbAccessUserSave from './DbAccessUserSave';
import useTableColumns from './useTableColumns';
import * as TYPES from '../typings';
import * as API from '../services';

export default (props: TYPES.DbAccessProps) => {
  /** 数据接收 */
  const { dbAccessDirCurrent } = props;
  /** 当前数据库ID */
  const dbId = dbAccessDirCurrent?.dbId || '';
  /** 当前权限目录ID */
  const editDirectoryId = dbAccessDirCurrent?.id || '';

  /** Table REF */
  const tableActionRef = useRef<TableActionType>();

  /** 保存人员授权 */
  const handlePlusOnSubmit = async (userSelection: UserListItem[]) => {
    const userIds = userSelection.map((item) => item.id);
    const res = await API.dbAccessUserSave({ dbId, editDirectoryId, userIds });
    if (res?.status === 'SUCCESS') tableActionRef?.current?.reload?.();
    return res;
  };

  /** 权限目录对应人员 */
  const generateTable: BaseTableProps<TYPES.DbAccessDirectorUserItem, TYPES.DbAccessDirectorUserQuery> = {
    search: { labelWidth: 60, span: { xs: 24, sm: 24, md: 8, lg: 8, xl: 8, xxl: 8 } },
    persistenceKey: 'PAGESDATABASEACCESSUSERTABLE',
    toolbar: {
      plus: { trigger: <DbAccessUserSave {...props} onSubmit={handlePlusOnSubmit} />, triggerType: 'submit' },
      deleted: { buttonText: '取消授权', onSubmit: API.dbAccessUserDeleteByIds },
    },
    service: {
      dataSourceRequest: API.dbAccessUserQueryPageInfo,
      params: { dbId, editDirectoryId },
      manualRequest: !editDirectoryId,
    },
    actionRef: tableActionRef,
    columns: useTableColumns,
  };

  return <BaseTable {...generateTable} />;
};
