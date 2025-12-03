/*
 * @Author: SHUANG
 * @Date: 2023-10-26 10:55:57
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-02-29 14:08:34
 * @Description: 定额库权限
 */
import { useRef, useState } from 'react';
import BaseTable from 'jd-framework-web/package/components/BaseTable';
import ViewContainer from 'jd-framework-web/package/components/ViewContainer';
import { BaseModalProps, BaseTableProps } from 'jd-framework-web/package/components';
import { TableActionType, TableToolbarDefine } from 'jd-framework-web/package/components';

import useTableColumns from './DbAccessMain/useTableColumns';
import { dbAccessQueryPageInfo } from './DbAccessMain/services';
import { DbAccessItem } from './DbAccessMain/typings';
import DbAccessDetails from './DbAccessDetails';
import DbAccessMain from './DbAccessMain';

export default () => {
  /** table REF */
  const tableActionRef = useRef<TableActionType>();

  /** 表格刷新 */
  const tableReload = () => tableActionRef.current?.reload?.();

  /** 定额库权限表当前行 */
  const [actionCurrent, setActionCurrent] = useState<DbAccessItem>();

  /** 弹窗属性 刷新当前表 */
  const style = { top: 45 };
  const modalProps: BaseModalProps = { width: 960, defaultFullScreen: false, afterClose: tableReload, style };

  /** 编辑定额库对应权限 */
  const toolbar: TableToolbarDefine = {
    edit: { buttonText: '设置权限', modalProps, render: <DbAccessMain dbAccessCurrent={actionCurrent} /> },
    details: {
      render: <DbAccessDetails dbAccessCurrent={actionCurrent} />,
      modalProps: { width: 500, defaultFullScreen: false },
      buttonText: '查看权限',
    },
  };

  /** 定额库用户权限查询表 */
  const generateTable: BaseTableProps<DbAccessItem> = {
    service: { dataSourceRequest: dbAccessQueryPageInfo },
    persistenceKey: 'PAGESDATABASEACCESSTABLE',
    onCurrent: setActionCurrent,
    columns: useTableColumns,
    actionRef: tableActionRef,
    toolbarAuthority: true,
    rowSelection: false,
    toolbar,
  };

  return (
    <ViewContainer>
      <BaseTable {...generateTable} />
    </ViewContainer>
  );
};
