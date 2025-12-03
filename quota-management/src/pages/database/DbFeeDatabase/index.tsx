/*
 * @Author: SHUANG
 * @Date: 2024-02-22 09:14:06
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-02-23 11:40:22
 * @Description: 取费模板库
 */
import { Button } from 'antd';
import { useRef, useState } from 'react';
import { FormOutlined } from '@ant-design/icons';

import BaseTable from 'jd-framework-web/package/components/BaseTable';
import useAuthButton from 'jd-framework-web/package/utils/auth/useAuthButton';
import ViewContainer from 'jd-framework-web/package/components/ViewContainer';
import { BaseTableProps, TableActionType, TableToolbarDefine } from 'jd-framework-web/package/components';

import { DatabaseDbItem } from '../DbMain/DatabaseMain/typings';
import DbFeeDatabaseCopy from './DbFeeDatabaseCopy';
import useTableColumns from './useTableColumns';
import useFormColumns from './useFormColumns';
import * as TYPES from './typings';
import * as API from './services';
import DbFee from '../DbFee';

export default () => {
  const { auth } = useAuthButton();
  const tableActionRef = useRef<TableActionType>();

  /** 表格刷新 */
  const tableReload = () => tableActionRef.current?.reload?.();

  /** 当前数据库 */
  const [databaseCurrent, setDatabaseCurrent] = useState<TYPES.DbFeeDatabaseItem & DatabaseDbItem>();

  /** TOOLBAR 取费模板库复制 */
  const DbFeeDatabaseCopyTrigger = (
    <DbFeeDatabaseCopy dbFeeDatabaseCurrent={databaseCurrent} reloadDbFeeDatabaseTable={tableReload} />
  );

  /** TOOLBAR 操作栏 定额库维护 */
  const DbFeeMainRender = <DbFee databaseCurrentDefault={databaseCurrent} />;

  /** 操作栏 弹窗属性 */
  const modalProps = { keyboardESC: false, width: 1200, style: { top: 45 } };

  /** 触发按钮 */
  const maintenanceButton = (
    <Button className="EditButton">
      <FormOutlined /> 取费模板维护
    </Button>
  );

  /** 列表操作栏 */
  const toolbar: TableToolbarDefine = {
    plus: { columns: useFormColumns, onSubmit: API.databaseDbFeeSave },
    plusMore: { authKey: 'copy', triggerType: 'submit', trigger: DbFeeDatabaseCopyTrigger },
    edit: { columns: useFormColumns, onSubmit: API.databaseDbFeeSave },
    deleted: { onSubmit: API.databaseDbFeeDeleteByIds },
    editOther: {
      buttonText: '取费模板维护',
      trigger: maintenanceButton,
      render: DbFeeMainRender,
      authKey: 'maintenance',
      modalProps,
    },
  };

  /** 取费模板库查询表 */
  const generateTable: BaseTableProps<TYPES.DbFeeDatabaseItem> = {
    persistenceKey: 'PAGES_DATABASE_DBFEEDATABASETABLE',
    onDoubleClick: () => ({ trigger: auth('maintenance') ? 'editOther' : auth('edit') ? 'edit' : 'none' }),
    service: { dataSourceRequest: API.fetchDatabaseDbFeeQueryPageInfo },
    onActionCurrent: setDatabaseCurrent,
    rowSelection: { columnWidth: 35 },
    columns: useTableColumns,
    actionRef: tableActionRef,
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
