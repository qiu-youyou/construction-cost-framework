/*
 * @Author: SHUANG
 * @Date: 2023-10-25 10:26:25
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-26 14:08:14
 * @Description: 定额 人材机含量表
 */
import { Button } from 'antd';
import { useState } from 'react';
import { EyeOutlined } from '@ant-design/icons';
import BaseTable from 'jd-framework-web/package/components/BaseTable';
import { BaseTableProps, TableToolbarDefine } from 'jd-framework-web/package/components';

import DbMatQuerySelection from '../../../common/DbMatQuerySelection';
import { DbMatItem } from '../../../DbMat/DbMatMainTable/typings';
import { DbNormProps, PropsDbNormInfo } from '../../typings';
import useTableColumns from './useTableColumns';
import MixProportion from './MixProportion';
import useServices from './useServices';
import * as TYPES from './typings';

export default (prop: DbNormProps & PropsDbNormInfo) => {
  /** 单独重写 props */
  const { dbNormMatProps } = prop;
  const props = { ...prop, ...dbNormMatProps };

  /** 当前定额明细 当前定额库 */
  const { dbNormCurrent } = props;

  const { databaseCurrent } = props;

  const { dbNormTableRef, dbNormMatContentTableRef } = props;
  const { dbNormMatTableProps, dbNormMatUseServices } = props;
  const { dbNormMatUseTableColumns } = props;

  const API = dbNormMatUseServices?.() || useServices();

  /** 库ID 章节ID 定额明细ID */
  const dbId = dbNormCurrent?.dbId || '';
  const normId = dbNormCurrent?.id || '';
  const chapterId = dbNormCurrent?.chapterId || '';

  /** 定额库 定额维护权限 */
  const normAccess = !!databaseCurrent?.access?.includes('norm');

  /** 当前行 */
  const [dbNormMatContentCurrent, setDbNormMatContentCurrent] = useState<TYPES.DbNormMatContentItem>();

  /** 查看配合比 */
  const modalProps = { defaultFullScreen: false, style: { top: 150, left: '5vw' }, width: 1100, mask: false };
  const MixProportionRender = (
    <MixProportion
      mixProportionServiceConfig={props?.mixProportionServiceConfig}
      dbNormMatContentCurrent={dbNormMatContentCurrent}
    />
  );

  /** 查看配合比 */
  const MixProportionTrigger = (
    <Button className="BorderButtonPrimary">
      <EyeOutlined /> 查看配合比
    </Button>
  );

  /** 保存查询的人材机 */
  const handlePlusRcjSave = async (matDataSelection: DbMatItem[]) => {
    const errorReturn: FETCH.Res = { status: 'ERROR', code: '', rows: [] };
    if (!dbNormCurrent) return errorReturn;

    /** 库ID 章节ID 定额明细ID 定额编号 */
    const { dbId, chapterId, id: normId, normCode } = dbNormCurrent;
    const ids = matDataSelection?.map((item) => item.id);
    const billSort = dbNormMatContentCurrent?.billSort || '';
    const currentId = dbNormMatContentCurrent?.id || '';

    const params = { dbId, normId, normCode, chapterId, currentId, billSort, ids };

    const res = await API.dbNormMatContentSaveSelectMatDetail(params);
    if (res?.status === 'SUCCESS') {
      /** 刷新 定额人材机含量表 及 定额表 */
      dbNormMatContentTableRef?.current?.reload?.();
      dbNormTableRef?.current?.reload?.();
    }
    return res;
  };
  const dbChapterDefaultCurrent = !dbNormMatContentCurrent?.matCode
    ? true
    : { id: dbNormMatContentCurrent?.matCode?.substring(0, 7) };

  /** 引用查询人材机 添加到含量 */
  const toolbarPlusTrigger = (
    <DbMatQuerySelection
      dbChapterDefaultCurrent={dbChapterDefaultCurrent as any}
      matMainDataSourceRequest={API.matMainQueryPageInfoNotExistsNormMat}
      dbMatMainTableProps={{ toolbar: { copy: { auth: false }, deleted: { auth: false } } }}
      classifyRjcTypePane={['rcj', 'concrete', 'machine']}
      databaseCurrent={databaseCurrent}
      primaryCurrent={dbNormCurrent}
      onSubmit={handlePlusRcjSave}
      isNorm
    />
  );

  /** 人材机含量列表 操作栏 */
  const fetchDbNormMatContentDeleteByIds = async (params: FETCH.UpStatus) => {
    const res = await API.dbNormMatContentDeleteByIds(params);
    /** 刷新 定额人材机含量表 及 定额表 */
    if (res?.status === 'SUCCESS') {
      dbNormTableRef?.current?.reload?.();
    }
    return res;
  };

  /** TOOLBAR */
  const toolbar: TableToolbarDefine<TYPES.DbNormMatContentQuery> = {
    plus: { auth: normAccess, trigger: toolbarPlusTrigger, triggerType: 'submit' },
    deleted: { auth: normAccess, onSubmit: fetchDbNormMatContentDeleteByIds },
    editMore: {
      render: MixProportionRender,
      trigger: MixProportionTrigger,
      buttonText: '查看配合比',
      modalProps,
    },
  };

  /** 人材机含量表 行编辑 修改含量 并刷新定额明细 */
  const handleDbNormMatContentUpdateRow = async (
    cell: FETCH.CellEditReq,
    params?: TYPES.DbNormMatContentQuery,
    cellParams?: unknown,
    entity?: TYPES.DbNormMatContentItem,
  ) => {
    const matRcjType = entity?.matRcjType || '';
    const res = await API.dbNormMatContentUpdateRow({ ...cell, ...params, matRcjType });
    if (res?.status === 'SUCCESS') dbNormTableRef?.current?.reload?.();
    return res;
  };

  const cellEditSaveRequest = props?.dbNormMatContentServiceConfig?.cellEditSaveRequest;
  const columnsProps = {
    dbNormMatContentUpdateRow: API.dbNormMatContentUpdateRow,
    dbNormMatContentTableRef,
    cellEditSaveRequest,
    dbNormTableRef,
    normAccess,
  };

  const generateTable: BaseTableProps<TYPES.DbNormMatContentItem, TYPES.DbNormMatContentQuery> = {
    persistenceKey: 'PAGESDATABASEDBNORMMATCONTENTTABLE',
    columns: dbNormMatUseTableColumns?.(columnsProps) || useTableColumns(columnsProps),
    service: props?.dbNormMatContentServiceConfig || {
      dataSourceRequest: API.dbNormMatContentQueryPageInfo,
      cellEditSaveRequest: handleDbNormMatContentUpdateRow,
      params: { dbId, chapterId, normId },
      manualRequest: !normId,
      ...dbNormMatTableProps?.service,
    },
    onActionCurrent: dbNormMatTableProps?.onActionCurrent,
    toolbarAfter: dbNormMatTableProps?.toolbarAfter,
    onDoubleClick: () => ({ trigger: 'editMore' }),
    onCurrent: (current) => {
      setDbNormMatContentCurrent(current);
      dbNormMatTableProps?.onCurrent?.(current);
    },
    onSelections: dbNormMatTableProps?.onSelections,
    actionRef: dbNormMatContentTableRef,
    rowSelection: normAccess && {},
    cellEditable: normAccess,
    columnsDynamic: true,
    virtual: false,
    search: false,
    minHeight: 50,
    toolbar,
  };

  return <BaseTable {...generateTable} />;
};
