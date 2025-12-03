/*
 * @Author: SHUANG
 * @Date: 2023-11-17 14:29:40
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-03-26 14:04:16
 * @Description: 全费用定额测算
 */
import { Button } from 'antd';
import { useState } from 'react';
import { ControlOutlined } from '@ant-design/icons';
import BaseTable from 'jd-framework-web/package/components/BaseTable';
import { BaseTableProps, TableToolbarDefine } from 'jd-framework-web/package/components';
import ViewContainer from 'jd-framework-web/package/components/ViewContainer';

import useTableColumns from './DbLayerMain/useTableColumns';
import useFormColumns from './DbLayerMain/useFormColumns';
import { DbLayerItem } from './DbLayerMain/typings';
import * as API from './DbLayerMain/services';
import DbLayerMain from './DbLayerMain';

export default () => {
  /** 定额层级 操作行、设置操作行 */
  const [dbLayerCurrent, setDbLayerCurrent] = useState<DbLayerItem>();

  /** 列表操作栏 */
  const modalProps = { width: 1200 };
  const trigger = (
    <Button className="EditButton">
      <ControlOutlined /> 定额测算
    </Button>
  );

  const toolbar: TableToolbarDefine = {
    plus: { columns: useFormColumns('plus'), onSubmit: API.dbLayerSave },
    edit: { columns: useFormColumns('edit'), onSubmit: API.dbLayerSave },
    deleted: { onSubmit: API.dbLayerDeleteByIds },
    editOther: {
      render: <DbLayerMain dbLayerCurrent={dbLayerCurrent} />,
      authKey: 'edit-layer',
      buttonText: '定额测算',
      modalProps,
      trigger,
    },
  };

  /** 全费用定额测算表 */
  const generateTable: BaseTableProps<DbLayerItem> = {
    service: { dataSourceRequest: API.dbLayerQueryPageInfo },
    persistenceKey: 'PAGESDATABASELAYERDBLAYERTABLE',
    onDoubleClick: () => ({ trigger: 'editOther' }),
    onActionCurrent: setDbLayerCurrent,
    rowSelection: { columnWidth: 30 },
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
