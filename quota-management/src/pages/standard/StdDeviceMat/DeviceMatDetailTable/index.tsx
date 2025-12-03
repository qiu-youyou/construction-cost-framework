/*
 * @Author: SHUANG
 * @Date: 2023-11-09 11:36:39
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-12-27 17:00:44
 * @Description:  标准库-装置性材料价格库-明细
 */

import BaseTable from 'jd-framework-web/package/components/BaseTable';
import useAuthButton from 'jd-framework-web/package/utils/auth/useAuthButton';
import { BaseTableProps, TableToolbarDefine } from 'jd-framework-web/package/components';
import { attachmentUpload } from 'jd-framework-web/package/common/annex/AnnexTable/services';

import { jondaReportExcel } from '@/common/services/system';
import useTableColumns from './useTableColumns';
import { StdDeviceMatProps } from '../typings';
import * as TYPES from './typings';
import * as API from './services';
import * as FET from './fetch';

export default (props: StdDeviceMatProps) => {
  const { auth } = useAuthButton();

  /** 当前选中目录 */
  const { deviceMatDirectoryCurrent } = props;
  /** 当前选中目录ID */
  const deviceMatDirectoryId = deviceMatDirectoryCurrent?.id || '';
  /** 当前装置性材料、设置当前装置性材料 */
  const { deviceMatDetailCurrent, setDeviceMatDetailCurrent } = props;

  /** 操作栏禁用条件 */
  const toolbarDisabled = !deviceMatDirectoryCurrent || !!deviceMatDirectoryCurrent?.children?.length;

  /** 装置性材料明细表 操作栏 导入导出参数 */
  const uploadParams = { deviceMatDirectoryId, bizType: 4, beanName: 'reportFileUploadServiceImpl' };
  const exportParams = {
    deviceMatDirectoryId,
    _u: 'file:4f6478ffdf9f43f5a382eab2909b1b9c.ureport.xml',
    _n: '装置性材料明细',
  };

  /** 装置性材料明细表 操作栏 */
  const toolbar: TableToolbarDefine = {
    plusLine: { authKey: 'plus', onSubmit: API.deviceMatDetailSaveBlankRow, disabled: toolbarDisabled },
    deleted: { onSubmit: API.deviceMatDetailDeleteByIds },
    export: { exportParams, onSubmit: jondaReportExcel, determineActionCurrent: false },
    import: { uploadParams, onSubmit: attachmentUpload },
  };

  /** 装置性材料明细表 */
  const generateTable: BaseTableProps<TYPES.DeviceMatDetailItem, TYPES.DeviceMatDetailQuery> = {
    persistenceKey: 'PAGESTANDARDDEVICEMATDETAILTABLE',
    service: {
      dataSourceRequest: FET.fetchDeviceMatDetailQueryPageInfo,
      cellEditSaveRequest: API.deviceMatDetailUpdateRow,
      manualRequest: !deviceMatDirectoryId,
      params: { deviceMatDirectoryId },
    },
    onCurrent: setDeviceMatDetailCurrent,
    cellEditable: auth('edit'),
    columns: useTableColumns,
    toolbarAuthority: true,
    toolbar,
  };

  return <BaseTable {...generateTable} />;
};
