/*
 * @Author: SHUANG
 * @Date: 2023-10-18 18:17:23
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-03-01 11:29:47
 * @Description: 定额库列表
 */
import { Button } from 'antd';
import { FormOutlined } from '@ant-design/icons';
import { ReactNode, useRef, useState } from 'react';
import BaseTable from 'jd-framework-web/package/components/BaseTable';
import ViewContainer from 'jd-framework-web/package/components/ViewContainer';
import useAuthButton from 'jd-framework-web/package/utils/auth/useAuthButton';
import { BaseTableProps, TableActionType, TableToolbarDefine } from 'jd-framework-web/package/components';

import ContrastPriceLevelByChapter from './DbContrast/ContrastPriceLevelByChapter';
import ContrastPriceLevelBySource from './DbContrast/ContrastPriceLevelBySource';
import ContrastPriceDifference from './DbContrast/ContrastPriceDifference';
import useDbTableColumns from './DatabaseMain/useDbTableColumns';
import useDbFormColumns from './DatabaseMain/useDbFormColumns';
import DataBaseCopy from '../common/DataBaseCopy';
import DatabaseMain from './DatabaseMain';

import { DatabaseDbItem } from './DatabaseMain/typings';
import * as API from './DatabaseMain/services';
import DbCorrigendum from './DbCorrigendum';
import DbCheck from './DbCheck';

type Props = {
  readonly?: boolean;
  maintenanceButton?: ReactNode;
};

export default (props: Props) => {
  const { auth } = useAuthButton();
  const tableActionRef = useRef<TableActionType>();

  /** 表格刷新 */
  const tableReload = () => tableActionRef.current?.reload?.();

  /** 定额库表勾选行 */
  const [databaseSelection, setDatabaseSelection] = useState<DatabaseDbItem[]>();

  /** 定额库表当前行 */
  const [databaseActionCurrent, setDatabaseActionCurrent] = useState<DatabaseDbItem>();

  /** 定额库复制操作 */
  const DataBaseCopyTrigger = (
    <DataBaseCopy databaseCurrent={databaseActionCurrent} reloadDbDataSource={tableReload} />
  );

  /** 操作栏 PRIMARY */
  const toolbarAfter = auth('comparison') && [
    /**  企业定额修编-价格差异对比 */
    <ContrastPriceDifference dbSelection={databaseSelection} key="difference" />,
    /**  企业定额修编-造价水平对比-章节对比 */
    <ContrastPriceLevelByChapter key="chapter" dbSelection={databaseSelection} />,
    /**  企业定额修编-造价水平对比-与来源库对比 */
    <ContrastPriceLevelBySource key="source" databaseCurrent={databaseActionCurrent} />,
  ];

  const toolbarLast = (auth('check') || auth('corrigendum')) && [
    /**  企业定额修编-定额审查 */
    auth('check') && <DbCheck key="check" databaseCurrent={databaseActionCurrent} />,

    /**  企业定额修编-定额勘误记录 */
    auth('corrigendum') && <DbCorrigendum key="cor·rigendum" databaseCurrent={databaseActionCurrent} />,
  ];

  /** 操作栏 删除控制 */
  const actionControl = { key: 'billStatus', value: '3', message: '启用状态的数据不允许删除!', equal: true };

  /** 操作栏 定额库维护 */
  const DataBaseMainRender = (
    <DatabaseMain readonly={props?.readonly} databaseCurrentDefault={databaseActionCurrent} />
  );

  /** 操作栏 弹窗属性 */
  const modalProps = { keyboardESC: false, width: 1200, style: { top: 45 } };

  /** 触发按钮 */
  const maintenanceButton = (
    <Button className="EditButton">
      <FormOutlined /> 企业定额维护
    </Button>
  );

  /** 列表操作栏 */
  const toolbar: TableToolbarDefine = {
    plus: { columns: useDbFormColumns, onSubmit: API.databaseDbSave },
    plusMore: { authKey: 'copy', triggerType: 'submit', trigger: DataBaseCopyTrigger },
    edit: { columns: useDbFormColumns, onSubmit: API.databaseDbSave },
    import: {
      uploadParams: { dbId: databaseActionCurrent?.id || '' },
      onSubmit: API.databaseUploadDbExcel,
      buttonText: '导入定额库',
    },

    deleted: { actionControl, onSubmit: API.databaseDbDeleteByIds },
    disable: { onSubmit: API.databaseDbUpdateStatusByIds },
    enable: { onSubmit: API.databaseDbUpdateStatusByIds },
    editOther: {
      buttonText: !props?.maintenanceButton ? '企业定额维护' : '企业定额查询',
      trigger: props?.maintenanceButton || maintenanceButton,
      render: DataBaseMainRender,
      authKey: 'maintenance',
      modalProps,
    },
  };

  /** 定额库查询表 */
  const generateTable: BaseTableProps<DatabaseDbItem> = {
    persistenceKey: 'PAGESDATABASETABLE',
    onDoubleClick: () => ({ trigger: auth('maintenance') ? 'editOther' : auth('edit') ? 'edit' : 'none' }),
    service: {
      dataSourceRequest: API.databaseDbQueryPageInfo,
      cellEditSaveRequest: API.databaseDbUpdateRow,
    },
    onActionCurrent: setDatabaseActionCurrent,
    onSelections: setDatabaseSelection,
    columns: useDbTableColumns,
    actionRef: tableActionRef,
    toolbarAuthority: true,
    toolbarAfter,
    toolbarLast,
    toolbar,
  };

  return (
    <ViewContainer>
      <BaseTable {...generateTable} />
    </ViewContainer>
  );
};
