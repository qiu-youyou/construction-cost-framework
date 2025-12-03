/*
 * @Author: SHUANG
 * @Date: 2023-10-18 11:54:04
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-17 17:49:29
 * @Description: 定额列表
 */
import BaseTable from 'jd-framework-web/package/components/BaseTable';
import { BaseTableProps, TableToolbarDefine } from 'jd-framework-web/package/components';

import DbNormBorrow from '@/pages/database/common/DbNormBorrow';
import { DbNormProps, PropsDbNorm } from '../typings';
import { DataBaseProps } from '../../../typings';
import useTableColumns from './useTableColumns';
import useFormColumns from './useFormColumns';
import useServices from './useServices';
import * as TYPES from './typings';
import useFetch from './useFetch';

export default (props: DbNormProps & PropsDbNorm & DataBaseProps) => {
  const { dbNormUseServices } = props;
  const API = dbNormUseServices?.() || useServices();
  const FET = useFetch({ API, ...props });

  /** 当前定额 */
  const { readonly, normReadonly } = props;
  const { dbNormCurrent, setDbNormCurrent } = props;

  /** 当前定额库 当前章节 */
  const { databaseCurrent, dbChapterCurrent } = props;

  /** 当前勾选定额 设置当前勾选定额 */
  const { dbNormSelection, setDbNormSelection } = props;

  /** 定额明细表REF 定额明细对应人材机含量表REF */
  const { dbNormTableRef, dbNormTableToolbarSlot } = props;

  /** 定额默认选中 */
  const { dbNormDefaultCurrent } = props;

  /** 定额库 定额维护权限 */
  const normAccess = !!databaseCurrent?.access?.includes('norm');

  /** 当前数据库ID 当前选中章节ID */
  const { dbId, id: chapterId } = dbChapterCurrent || { dbId: '', id: '' };

  /** 操作栏禁用条件 */
  const toolbarDisabled = !dbChapterCurrent || !!dbChapterCurrent?.children?.length;

  /** 操作栏方法 */
  const current = dbNormSelection?.[0] || dbNormCurrent;

  /** 编辑调整系数 */
  const buttonText = '调整系数';
  const editOnSubmit = async (p: TYPES.DbNormAdjustParams) => {
    const normSelection = !!dbNormSelection?.length ? dbNormSelection : dbNormCurrent && [dbNormCurrent];
    return await FET.fetchDbNormCoefficientAdjust(p, normSelection, chapterId);
  };

  const { dbNormTableProps } = props; // 定额表配置

  /** 表格操作栏 */
  const toolbar: TableToolbarDefine<TYPES.DbNormQuery> = {
    plusLine: { onSubmit: FET.fetchDbNormPlus, disabled: toolbarDisabled, auth: normAccess },
    edit: { buttonText, onSubmit: editOnSubmit, columns: useFormColumns, auth: normAccess, current },
    calc: { onSubmit: FET.fetchDbNormManualCalculation, auth: normAccess },
    deleted: { onSubmit: API.dbNormDeleteByIds, auth: normAccess },
    copy: { onSubmit: FET.fetchDbNormPaste, auth: normAccess },
    seniorSearch: { customKey: 'seniorSearch' },
    ...dbNormTableProps?.toolbar,
  };

  /** 操作栏 定额 - 借用定额 */
  const toolbarPrimary =
    normAccess &&
    (dbNormTableProps?.toolbarPrimary || (
      <DbNormBorrow
        onSubmit={FET.fetchDbNormBorrowOnSubmit}
        databaseCurrentDefault={databaseCurrent}
        dbDataSource={props?.dbDataSource}
        normCurrentDefault={dbNormCurrent}
        dbDataSourceRequestManual={true}
      />
    ));

  /** 获取数据 */
  const handleFetchDbNormQueryPageInfo = async (p: FETCH.Req<TYPES.DbNormQuery>) => {
    const res = await FET.fetchDbNormQueryPageInfo(p);
    if (res?.status === 'SUCCESS' && !!dbNormDefaultCurrent?.id) {
      const index = res?.rows?.findIndex(
        (item: { id: string | undefined }) => item.id == dbNormDefaultCurrent?.id,
      );
      setTimeout(() => {
        dbNormTableRef?.current?.tableScrollTo?.(index);
      }, 27);
    }

    return res;
  };

  /** 定额列表 */
  const generateTable: BaseTableProps<TYPES.DbNormItem, TYPES.DbNormQuery> = {
    persistenceKey: dbNormTableProps?.persistenceKey || 'PAGESDATABASEDBNORMTABLE',
    rowSelection:
      !readonly &&
      (dbNormTableProps?.rowSelection != undefined ? dbNormTableProps?.rowSelection : { columnWidth: 40 }),

    defaultCurrent: !dbNormDefaultCurrent || (dbNormDefaultCurrent as any),
    service: {
      dataSourceRequest: handleFetchDbNormQueryPageInfo,
      cellEditSaveRequest: API.dbNormUpdateRow,
      params: { dbId, chapterId },
      manualRequest: !chapterId,
      ...dbNormTableProps?.service,
    },
    toolbarBefore: dbNormTableProps?.toolbarBefore,
    columns: useTableColumns({ normReadonly }),
    toolbarLast: dbNormTableToolbarSlot,
    onSelections: setDbNormSelection,
    onCurrent: setDbNormCurrent,
    actionRef: dbNormTableRef,
    cellEditable: normAccess,
    toolbarPrimary,
    toolbar,
  };

  return <BaseTable {...generateTable} />;
};
