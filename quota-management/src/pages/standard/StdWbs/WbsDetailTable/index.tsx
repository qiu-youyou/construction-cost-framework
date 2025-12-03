/*
 * @Author: SHUANG
 * @Date: 2024-02-21 16:36:39
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-18 15:36:45
 * @Description: 标准库-WBS库-目录
 */

import BaseTable from 'jd-framework-web/package/components/BaseTable';
import { BaseTableProps } from 'jd-framework-web/package/components';
import SyncWbsButton from '@/pages/dataswap/SyncWbsButton';

import useTableColumns from './useTableColumns';
import { StdWbsProps } from '../typings';
import * as TYPES from './typings';
import * as API from './services';

export default (props: StdWbsProps) => {
  /**  PROPS 自定义操作 */
  const { toolbarSlot } = props;

  /** PROPS WBS明细双击事件 */
  const { onDoubleClick } = props;

  /** PROPS WBS目录当前选中 */
  const { wbsDirectoryCurrent } = props;

  /** PROPS WBS明细当前选中 */
  const { wbsDetailCurrent, setWbsDetailCurrent } = props;

  /** PROPS TABLEREF  TREEREF */
  const { wbsDetailTableRef, wbsDirectoryTreeRef } = props;

  /** WBS 目录 ID */
  const wbsDirectoryId = wbsDirectoryCurrent?.id || '';

  /** TOOLBAR 同步 WBS 信息 */
  const toolbarBefore = [
    <SyncWbsButton
      onSuccess={() => {
        wbsDirectoryTreeRef?.current?.reload?.();
        wbsDetailTableRef?.current?.reload?.();
      }}
    />,
  ];

  /** WBS明细表 */
  const generateTable: BaseTableProps<TYPES.WbsDetailItem, TYPES.WbsDetailQuery> = {
    persistenceKey: 'PAGES_STANDARD_WBSDETAILTABLE',
    service: {
      dataSourceRequest: API.wbsDetailQueryPageInfo,
      manualRequest: !wbsDirectoryId,
      params: { wbsDirectoryId },
    },
    toolbar: { expand: { buttonText: '全部' } },
    onCurrent: setWbsDetailCurrent,
    actionRef: wbsDetailTableRef,
    columns: useTableColumns,
    toolbarLast: toolbarSlot,
    rowSelection: false,
    calcTotal: true,
    search: false,
    toolbarBefore,
    expandable: {},
    onDoubleClick,
  };

  return <BaseTable {...generateTable} />;
};
