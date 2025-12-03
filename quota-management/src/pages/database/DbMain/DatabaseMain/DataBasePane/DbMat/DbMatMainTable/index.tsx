/*
 * @Author: SHUANG
 * @Date: 2023-10-21 11:52:41
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-26 14:51:10
 * @Description: 定额库(人材机 机械台班 混凝土配合比) 明细表
 */
import { useEffect, useState } from 'react';
import BaseTable from 'jd-framework-web/package/components/BaseTable';
import { BaseTableProps, TableColumnsDefine, TableToolbarDefine } from 'jd-framework-web/package/components';

import { DbMatClassifyItem } from '../DbMatClassifyTree/typings';
import MatSyncPriceInfo from '../components/MatSyncPriceInfo';
import MatRelatedNorm from '../components/MatRelatedNorm';
import { ClassifyRjcType } from '../../../typings';
import useTableColumns from './useTableColumns';
import useServices from './useServices';
import * as TYPES from './typings';
import useFetch from './useFetch';

export default (props: TYPES.DbMatProps & TYPES.PropsDbMat) => {
  const { dbMatMainUseServices } = props;

  /** 数据接收 */
  /** 主材表配置 */
  const { dbMatMainTableProps } = props;

  const { tableProps, setDbMatCurrent } = props;
  const { databaseCurrent, dbMatMainTableRef } = props;

  const { classifyRjcType, dbMatClassifyCurrent: dbMatClassifyCurrentProps } = props;

  const API = dbMatMainUseServices?.() || useServices();
  const FET = useFetch({ API, ...props });

  /** 定额库 定额维护权限 */
  const rcjAccess = !!databaseCurrent?.access?.includes('rcj');

  /** 当前勾选MAT明细 */
  const [dbMatAction, setDbMatAction] = useState<TYPES.DbMatItem>();

  /** MAT明细列配置 */
  const [columns, setColumns] = useState<TableColumnsDefine<TYPES.DbMatItem>>([]);

  /** 当前目录章节 */
  const [dbMatClassifyCurrent, setDbMatClassifyCurrent] = useState<DbMatClassifyItem>();

  /** 数据库ID MAT目录ID */
  const dbId = dbMatClassifyCurrent?.dbId || '';
  const classifyId = dbMatClassifyCurrent?.id || '';

  /** 非定额章节目录  rcj[人材机]、machine[机械台班]、concrete[混凝土]  */
  const inCludesDbClassifyArr: ClassifyRjcType[] = ['rcj', 'concrete', 'machine'];
  const isDbClassify = classifyRjcType && inCludesDbClassifyArr.includes(classifyRjcType);

  /** 目录类型发生变化 动态改变 columns */
  useEffect(() => {
    isDbClassify && setColumns(useTableColumns({ classifyRjcType }));
  }, [classifyRjcType]);

  /** 改变当前目录 */
  useEffect(() => {
    setDbMatClassifyCurrent(dbMatClassifyCurrentProps);
  }, [dbMatClassifyCurrentProps]);

  /** 操作栏 */
  /** 人材机类型 - 查看相关定额  */
  const MatRelatedNormRender = (
    <MatRelatedNorm
      tableProps={{ service: { dataSourceRequest: API.queryNormByMatClassifyDetailIds } }}
      dbMatCurrent={dbMatAction}
      key="1"
    />
  );

  /** 人材机 - 同步人材机价格信息 */
  const MatSyncPriceInfoRender = (
    <MatSyncPriceInfo
      buttonProps={{ service: { dataSourceRequest: API.dbMatUpdateDetailMatByDbId } }}
      databaseCurrent={databaseCurrent}
      key="2"
    />
  );

  const toolbarAfter = [MatRelatedNormRender];
  const toolbarLast = classifyRjcType === 'rcj' ? MatSyncPriceInfoRender : null;

  /** 操作栏 */
  const toolbar: TableToolbarDefine<TYPES.DbMatQuery> = {
    plusLine: {
      disabled: !dbMatClassifyCurrent || !!dbMatClassifyCurrent?.children?.length,
      onSubmit: async (p, t) => FET.handleDbMatMainPlus(p, t, dbMatClassifyCurrent),
      auth: rcjAccess,
    },

    copy: {
      onSubmit: async (...args) => FET.handleDbMatMainPaste(...args, dbMatClassifyCurrent),
      auth: rcjAccess,
    },

    deleted: { onSubmit: API.dbMatDeleteByIds, auth: rcjAccess },
    seniorSearch: { customKey: 'seniorSearch' },

    ...dbMatMainTableProps?.toolbar,
  };

  /** MAT明细列表 */
  const rowSelection =
    dbMatMainTableProps?.rowSelection !== undefined
      ? dbMatMainTableProps?.rowSelection
      : tableProps?.rowSelection || {};

  const generateTable: BaseTableProps<TYPES.DbMatItem, TYPES.DbMatQuery> = {
    persistenceKey: 'PAGESDATABASEDBMATMAINTABLE' + classifyRjcType?.toLocaleUpperCase(),

    onCurrent: (record) => {
      setDbMatCurrent?.(record);
      dbMatMainTableProps?.onCurrent?.(record);
    },
    toolbarLast: rcjAccess && toolbarLast,
    onActionCurrent: setDbMatAction,
    actionRef: dbMatMainTableRef,
    cellEditable: rcjAccess,
    columnsDynamic: true,
    toolbarAfter,
    columns,
    ...dbMatMainTableProps,
    service: {
      dataSourceRequest: FET.fetchDbMatQueryPageInfo,
      cellEditSaveRequest: API.dbMatUpdateRow,
      params: { dbId, classifyId },
      manualRequest: !classifyId,
      ...dbMatMainTableProps?.service,
    },
    ...tableProps,
    rowSelection,
    toolbar,
  };

  return <BaseTable {...generateTable} />;
};
