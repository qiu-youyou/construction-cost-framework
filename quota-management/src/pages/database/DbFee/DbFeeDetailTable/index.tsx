/*
 * @Author: SHUANG
 * @Date: 2023-10-21 11:52:41
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-03-12 17:29:23
 * @Description: 定额库 取费 明细表
 */
import { BaseTableProps, TableToolbarDefine } from 'jd-framework-web/package/components';
import { attachmentUpload } from 'jd-framework-web/package/common/annex/AnnexTable/services';
import useAuthButton from 'jd-framework-web/package/utils/auth/useAuthButton';
import BaseTable from 'jd-framework-web/package/components/BaseTable';
import { jondaReportExcel } from '@/common/services/system';

import BatchUpdateBaseFeeRate from './BatchUpdateBaseFeeRate';

import useTableColumns from './useTableColumns';
import { DbFeeProps } from '../typings';
import * as TYPES from './typings';
import * as API from './services';

export default (props: DbFeeProps) => {
  const { auth } = useAuthButton();
  /** 当前取费目录 */
  const { dbFeeDetailTableRef } = props;
  const { readonly, toolbarSlot } = props;
  const { dbFeeDirectoryCurrent } = props;
  /** 当前取费明细 设置当前取费明细 */
  const { dbFeeDetailCurrent, setDbFeeDetailCurrent } = props;
  const { dbFeeDetailSelection, setDbFeeDetailSelection } = props;

  /** 当前数据库ID */
  const { databaseCurrent } = props;
  const dbId = dbFeeDirectoryCurrent?.dbId || '';
  const dbName = databaseCurrent?.dbName || '';
  /** 当前取费目录ID */
  const feeDirectoryId = dbFeeDirectoryCurrent?.id || '';
  const feeDirectoryName = dbFeeDirectoryCurrent?.feeDirectoryName || '';
  const dbFeeDetailTableReload = () => dbFeeDetailTableRef?.current?.reload?.();

  /** 取费明细 操作栏 禁用 */
  const toolbarDisabled = !dbFeeDirectoryCurrent || !!dbFeeDirectoryCurrent?.children?.length;

  /** 取费明细 操作栏 导入导出参数 */
  const uploadParams = { dbId, feeDirectoryId, bizType: 2, beanName: 'reportFileUploadServiceImpl' };
  const exportParams = {
    _u: 'file:754547897daa43bea0b6900706b78bfa.ureport.xml',
    _n: '取费模板明细',
    feeDirectoryName,
    feeDirectoryId,
    dbName,
    dbId,
  };

  /** 取费明细 操作栏 */
  const toolbar: TableToolbarDefine<TYPES.DbFeeDetailItem> = {
    plusLine: { authKey: 'plus-fee', disabled: toolbarDisabled, onSubmit: API.dbFeeDetailSaveBlankRow },
    deleted: { authKey: 'deleted-fee', disabled: toolbarDisabled, onSubmit: API.dbFeeDetailDeleteByIds },
    import: {
      authKey: 'import-fee',
      onSubmit: attachmentUpload,
      disabled: toolbarDisabled,
      uploadParams,
    },
    export: {
      authKey: 'export-fee',
      onSubmit: jondaReportExcel,
      determineActionCurrent: false,
      disabled: toolbarDisabled,
      exportParams,
    },
  };

  /** TOOLBAR 应用到其他取费表 */
  const toolbarAfter = auth('batch-update-fee') && (
    <BatchUpdateBaseFeeRate
      dbFeeDetailTableRef={dbFeeDetailTableRef}
      dbFeeDetailSelection={
        dbFeeDetailSelection?.length
          ? dbFeeDetailSelection
          : dbFeeDetailCurrent
          ? [dbFeeDetailCurrent]
          : undefined
      }
    />
  );

  /** 取费明细表 */
  const { tableProps } = props;
  const generateTable: BaseTableProps<TYPES.DbFeeDetailItem, TYPES.DbFeeDetailQuery> = {
    persistenceKey: 'PAGESDATABASEDBFEEDETAILTABLE',
    columns: props?.dbFeeDetailTableColumns || useTableColumns({ dbFeeDetailTableReload, readonly }),
    service: props?.dbFeeDetailTableServiceConfig || {
      dataSourceRequest: API.dbFeeDetailQueryPageInfo,
      cellEditSaveRequest: API.dbFeeDetailUpdateRow,
      params: { dbId, feeDirectoryId },
      manualRequest: !feeDirectoryId,
    },
    cellEditable: !readonly && auth('edit-fee'),
    toolbarAfter: !readonly && toolbarAfter,
    onSelections: setDbFeeDetailSelection,
    rowSelection: !readonly ? {} : false,
    onCurrent: setDbFeeDetailCurrent,
    actionRef: dbFeeDetailTableRef,
    search: !readonly ? {} : false,
    toolbar: !readonly && toolbar,
    toolbarFirst: toolbarSlot,
    toolbarAuthority: true,
    virtual: false,
    ...tableProps,
  };

  return <BaseTable {...generateTable} />;
};
