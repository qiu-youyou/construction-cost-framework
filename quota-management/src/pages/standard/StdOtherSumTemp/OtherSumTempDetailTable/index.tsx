/*
 * @Author: SHUANG
 * @Date: 2023-11-13 16:42:01
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-02-28 16:10:46
 * @Description: 标准库-项目汇总表-明细
 */
import BaseTable from 'jd-framework-web/package/components/BaseTable';
import useAuthButton from 'jd-framework-web/package/utils/auth/useAuthButton';
import { BaseTableProps, TableToolbarDefine } from 'jd-framework-web/package/components';
import { attachmentUpload } from 'jd-framework-web/package/common/annex/AnnexTable/services';

import { jondaReportExcel } from '@/common/services/system';
import * as TYPES from '../../StdOtherFeeTemp/OtherFeeTempDetailTable/typings';
import { StdOtherSumTempProps } from '../typings';
import useTableColumns from './useTableColumns';
import * as API from './services';

export default (props: StdOtherSumTempProps) => {
  const { auth } = useAuthButton();
  const { readonly, toolbarSlot } = props;

  /** TABLE REF */
  const { otherSumTempDetailTableRef } = props;
  /** 当前选中目录 */
  const { otherSumTempDirectoryCurrent } = props;

  /** 当前其他费用模板、设置当前其他费用模板 */
  const { otherSumTempDetailCurrent, setOtherSumTempDetailCurrent } = props;

  /** 当前选中目录ID */
  const otherSumDirectoryId = otherSumTempDirectoryCurrent?.id || '';
  const otherSumDirectoryName = otherSumTempDirectoryCurrent?.otherSumDirectoryName;

  /** 操作栏禁用条件 */
  const toolbarDisabled = !otherSumTempDirectoryCurrent || !!otherSumTempDirectoryCurrent?.children?.length;

  /** 其他费用模板明细表 操作栏 导入导出 */
  const exportParams = {
    _u: 'file:96759a7d4e9348ce92b2e98fe15ba0c3.ureport.xml',
    _n: ' 项目汇总表模板明细',
    otherSumDirectoryId,
  };
  const uploadParams = {
    beanName: 'reportFileUploadServiceImpl',
    otherSumDirectoryId,
    otherSumDirectoryName,
    bizType: 7,
  };

  /** 其他费用模板明细表 操作栏 */
  const toolbar: TableToolbarDefine = {
    plusLine: {
      onSubmit: async (p) => API.otherSumTempDetailSaveBlankRow({ ...p, otherSumDirectoryName }),
      disabled: toolbarDisabled,
      authKey: 'plus',
    },
    deleted: { onSubmit: API.otherSumTempDetailDeleteByIds },
    export: { exportParams, onSubmit: jondaReportExcel, determineActionCurrent: false },
    import: { uploadParams, onSubmit: attachmentUpload },
  };

  /** 其他费用模板明细表 */
  const otherSumTempDetailTableRelaod = () => otherSumTempDetailTableRef?.current?.reload?.();
  const generateTable: BaseTableProps<TYPES.OtherFeeTempDetailItem, TYPES.OtherFeeTempDetailQuery> = {
    persistenceKey: 'PAGESTANDARDOTHERSUMTEMPDETAILTABLE',
    service: {
      dataSourceRequest: API.otherSumTempDetailQueryPageInfo,
      cellEditSaveRequest: API.otherSumTempDetailUpdateRow,
      manualRequest: !otherSumDirectoryId,
      params: { otherSumDirectoryId },
    },
    columns: useTableColumns({ otherSumTempDetailTableRelaod }),
    onCurrent: setOtherSumTempDetailCurrent,
    actionRef: otherSumTempDetailTableRef,
    rowSelection: readonly ? false : {},
    cellEditable: auth('edit'),
    toolbarFirst: toolbarSlot,
    toolbarAuthority: true,
    toolbar,
  };

  return <BaseTable {...generateTable} />;
};
