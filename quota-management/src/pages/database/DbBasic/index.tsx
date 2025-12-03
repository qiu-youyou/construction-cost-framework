/*
 * @Author: SHUANG
 * @Date: 2024-02-29 11:22:29
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-03-04 15:15:40
 * @Description: 基础企业定额
 */
import { Button } from 'antd';
import { useRef, useState } from 'react';
import { FormOutlined } from '@ant-design/icons';
import BaseTable from 'jd-framework-web/package/components/BaseTable';
import useAuthButton from 'jd-framework-web/package/utils/auth/useAuthButton';
import ViewContainer from 'jd-framework-web/package/components/ViewContainer';
import { BaseTableProps, TableActionType, TableToolbarDefine } from 'jd-framework-web/package/components';

import { BasicDatabaseDbItem } from './typings';
import useTableColumns from './useTableColumns';
import useFormColumns from './useFormColumns';
import DbBasicMain from './DbBasicMain';
import * as API from './services';

export default () => {
  const { auth } = useAuthButton();
  const tableActionRef = useRef<TableActionType>();

  /** 基础定额库操作行 */
  const [basicDatabaseActionCurrent, setBasicDatabaseActionCurrent] = useState<BasicDatabaseDbItem>();

  /** 操作栏 定额库维护 */
  const DbBasicMainRender = <DbBasicMain databaseCurrent={basicDatabaseActionCurrent as any} />;

  /** 列表操作栏 */
  const message = '禁止删除审批中和已完成的单据!';
  const actionControl = { key: 'billStatus', equal: true, value: '0', message };

  /** 操作栏 弹窗属性 */
  const modalProps = { keyboardESC: false, width: 1200, style: { top: 45 } };

  /** 触发按钮 */
  const maintenanceButton = (
    <Button className="EditButton" icon={<FormOutlined />}>
      基础企业定额维护
    </Button>
  );

  const toolbar: TableToolbarDefine = {
    plus: { modalProps: { width: 550 }, columns: useFormColumns, onSubmit: API.basicDatabaseDbSave },
    edit: { modalProps: { width: 550 }, columns: useFormColumns, onSubmit: API.basicDatabaseDbSave },
    deleted: { actionControl, onSubmit: API.basicDatabaseDbDeleteByIds },
    editOther: {
      buttonText: '基础企业定额维护',
      trigger: maintenanceButton,
      render: DbBasicMainRender,
      authKey: 'maintenance',
      modalProps,
    },
  };

  /** 基础定额维护列表 */
  const generateTable: BaseTableProps<BasicDatabaseDbItem> = {
    persistenceKey: 'PAGES_DATABASE_DBBASIC_DBBASICEDATABASEDBTABLE',
    onDoubleClick: () => ({ trigger: auth('maintenance') ? 'editOther' : auth('edit') ? 'edit' : 'none' }),
    service: { dataSourceRequest: API.basicDatabaseDbQueryPageInfo },
    onActionCurrent: setBasicDatabaseActionCurrent,
    actionRef: tableActionRef,
    columns: useTableColumns,
    toolbarAuthority: true,
    toolbar,
  };

  return (
    <ViewContainer>
      <BaseTable {...generateTable} />
    </ViewContainer>
  );
};
