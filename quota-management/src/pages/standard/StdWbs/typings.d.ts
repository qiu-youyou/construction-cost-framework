/*
 * @Author: SHUANG
 * @Date: 2024-02-21 16:28:22
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-02-27 10:28:19
 * @Description: 标准库-WBS库
 */

import { Dispatch, ReactNode, SetStateAction } from 'react';
import { TableActionType, TreeActionType, ViewContainePropsType } from 'jd-framework-web/package/components';
import { WbsDirectoryItem } from './WbsDirectoryTree/typings';
import { WbsDetailItem } from './WbsDetailTable/typings';

/** WBS向下 传递 PROPS */
export type StdWbsProps = {
  /** WBS目录 当前选中 */
  wbsDirectoryCurrent?: WbsDirectoryItem;
  /** WBS目录 设置当前选中 */
  setWbsDirectoryCurrent?: Dispatch<SetStateAction<WbsDirectoryItem | undefined>>;

  /** WBS明细 当前选中 */
  wbsDetailCurrent?: WbsDetailItem;
  /** WBS明细 设置当前选中 */
  setWbsDetailCurrent?: Dispatch<SetStateAction<WbsDetailItem | undefined>>;

  /** WBS 目录 REF */
  wbsDirectoryTreeRef?: TreeActionType;
  /** WBS明细表REF */
  wbsDetailTableRef?: TableActionType;

  /** 面板高度 */
  viewContainerScroll?: ViewContainePropsType['scroll'];
  /** 指标类型 双击行事件 */
  onDoubleClick?: () => void;
  /** 操作栏 插槽 */
  toolbarSlot?: ReactNode;
  /** 分割面板宽度 */
  splitWidth?: number;
};
