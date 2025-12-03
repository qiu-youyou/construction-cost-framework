/*
 * @Author: SHUANG
 * @Date: 2023-11-10 11:31:25
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-02-28 16:11:21
 * @Description: 标准库-其他费用模板-明细
 */
import BaseTable from 'jd-framework-web/package/components/BaseTable';
import useAuthButton from 'jd-framework-web/package/utils/auth/useAuthButton';
import { BaseTableProps, TableToolbarDefine } from 'jd-framework-web/package/components';
import { attachmentUpload } from 'jd-framework-web/package/common/annex/AnnexTable/services';

import { jondaReportExcel } from '@/common/services/system';
import { StdOtherFeeTempProps } from '../typings';
import useTableColumns from './useTableColumns';
import * as TYPES from './typings';
import * as API from './services';

export default (props: StdOtherFeeTempProps) => {
  const { auth } = useAuthButton();
  const { readonly, toolbarSlot } = props;

  /** TABLE REF */
  const { otherFeeTempDetailTableRef } = props;
  /** 当前选中目录 */
  const { otherFeeTempDirectoryCurrent } = props;

  /** 当前其他费用模板、设置当前其他费用模板 */
  const { otherFeeTempDetailCurrent, setOtherFeeTempDetailCurrent } = props;

  /** 当前选中目录ID */
  const otherSumDirectoryId = otherFeeTempDirectoryCurrent?.id || '';
  const otherSumDirectoryName = otherFeeTempDirectoryCurrent?.otherSumDirectoryName;

  /** 操作栏禁用条件 */
  const toolbarDisabled = !otherFeeTempDirectoryCurrent || !!otherFeeTempDirectoryCurrent?.children?.length;

  /** 其他费用模板明细表 操作栏 */
  const exportParams = {
    _u: 'file:92a04ee0c83a4693b9fcef7b5ce18bb2.ureport.xml',
    _n: ' 其他费模板明细',
    otherSumDirectoryId,
  };
  const uploadParams = {
    beanName: 'reportFileUploadServiceImpl',
    otherSumDirectoryId,
    otherSumDirectoryName,
    bizType: 6,
  };

  const toolbar: TableToolbarDefine = {
    plusLine: {
      onSubmit: async (p) => API.otherFeeTempDetailSaveBlankRow({ ...p, otherSumDirectoryName }),
      disabled: toolbarDisabled,
      authKey: 'plus',
    },
    deleted: { onSubmit: API.otherFeeTempDetailDeleteByIds },
    export: { exportParams, onSubmit: jondaReportExcel, determineActionCurrent: false },
    import: { uploadParams, onSubmit: attachmentUpload },
  };

  /** 其他费用模板明细表 */
  const otherFeeTempDetailTableRelaod = () => otherFeeTempDetailTableRef?.current?.reload?.();
  const generateTable: BaseTableProps<TYPES.OtherFeeTempDetailItem, TYPES.OtherFeeTempDetailQuery> = {
    persistenceKey: 'PAGESTANDARDOTHERFEETEMPDETAILTABLE',
    service: {
      dataSourceRequest: API.otherFeeTempDetailQueryPageInfo,
      cellEditSaveRequest: API.otherFeeTempDetailUpdateRow,
      manualRequest: !otherSumDirectoryId,
      params: { otherSumDirectoryId },
    },
    columns: useTableColumns({ otherFeeTempDetailTableRelaod }),
    onCurrent: setOtherFeeTempDetailCurrent,
    actionRef: otherFeeTempDetailTableRef,
    rowSelection: readonly ? false : {},
    cellEditable: auth('edit'),
    toolbarFirst: toolbarSlot,
    toolbarAuthority: true,
    toolbar,
  };

  return <BaseTable {...generateTable} />;
};
