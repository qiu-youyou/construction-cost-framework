/*
 * @Author: SHUANG
 * @Date: 2023-10-21 16:12:22
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-18 11:40:42
 * @Description: 定额库(人材机 机械台班 混凝土配合比) 明细对应含量
 */
import BaseTable from 'jd-framework-web/package/components/BaseTable';
import { BaseTableProps, TableToolbarDefine } from 'jd-framework-web/package/components';

import { DbMatItem, DbMatProps, PropsDbMat } from '../DbMatMainTable/typings';
import DbMatQuerySelection from '../../common/DbMatQuerySelection';
import useTableColumns from './useTableColumns';
import useServices from './useServices';
import * as TYPES from './typings';
import useFetch from './useFetch';

export default (props: DbMatProps & PropsDbMat) => {
  /** 当前MAT */
  const { dbMatCurrent } = props;

  const { dbMatContentUseServices } = props;

  /** 数据库ID MAT目录ID MAT明细ID */
  const dbId = dbMatCurrent?.dbId || '';
  const classifyId = dbMatCurrent?.classifyId || '';
  const matId = dbMatCurrent?.id || '';

  /** MAT明细当前行、 当前数据库、 当前目录类型 */
  const { databaseCurrent, classifyRjcType } = props;

  /** 明细表 明细表对对应含量表 REF */
  const { dbMatMainTableRef, dbMatContentTableRef } = props;

  /** 当前MAT明细， 设置当前MAT明细 */
  const { dbMatContentCurrent, setDbMatContentCurrent } = props;

  const API = dbMatContentUseServices?.() || useServices();

  const FET = useFetch({ API, ...props });

  /** 定额库 定额维护权限 */
  const rcjAccess = !!databaseCurrent?.access?.includes('rcj');

  /** 保存查询的人材机 */
  const dbMatQuerySelectionOnSubmit = async (_: DbMatItem[]) => {
    const res = await FET.handlePlusRcjSave(_);
    /** 刷新MAT明细表 以及 MAT含量表 */
    if (res?.status === 'SUCCESS') {
      dbMatContentTableRef?.current?.reload?.();
      dbMatMainTableRef?.current?.reload?.();
    }
    return res;
  };

  /** 引用查询人材机 添加到含量 */
  const toolbarPlusTrigger = (
    <DbMatQuerySelection
      modalStyle={{ top: 115, left: '6vw' }}
      matMainDataSourceRequest={API.matMainQueryPageInfoNotExistsMat}
      dbMatMainUseServices={props.dbMatMainUseServices}
      dbMatMainTableProps={props.dbMatMainTableProps}
      onSubmit={dbMatQuerySelectionOnSubmit}
      databaseCurrent={databaseCurrent}
      classifyRjcTypePane={['rcj']}
      primaryCurrent={dbMatCurrent}
      okText="确 定"
    />
  );

  const toolbar: TableToolbarDefine<TYPES.DbMatContentItem> = {
    plus: { trigger: toolbarPlusTrigger, triggerType: 'submit', auth: rcjAccess },
    deleted: { onSubmit: FET.fetchDbMatContentDeleteByIds, auth: rcjAccess },
    seniorSearch: { customKey: 'seniorSearch' },
  };

  /** MAT明细对应含量列表 */
  const { dbMatContentTableProps } = props;
  const generateTable: BaseTableProps<TYPES.DbMatContentItem, TYPES.DbMatContentQuery> = {
    persistenceKey: 'PAGESDATABASEDBMATCONTENTTABLE' + classifyRjcType?.toLocaleUpperCase(),
    rowSelection: dbMatContentTableProps?.rowSelection || {},
    service: {
      dataSourceRequest: API.dbMatContentQueryPageInfo,
      cellEditSaveRequest: FET.fetchDbMatContentUpdateRow,
      params: { dbId, classifyId, matId },
      manualRequest: !matId,
      ...dbMatContentTableProps?.service,
    },
    onCurrent: setDbMatContentCurrent,
    actionRef: dbMatContentTableRef,
    columns: useTableColumns,
    cellEditable: rcjAccess,
    search: false,
    toolbar,
  };

  return <BaseTable {...generateTable} />;
};
