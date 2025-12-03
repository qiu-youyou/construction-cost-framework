/*
 * @Author: SHUANG
 * @Date: 2023-11-10 11:13:32
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-02-28 14:14:39
 * @Description: 标准库-其他费模板库
 */

import { Dispatch, ReactNode } from 'react';
import { OtherFeeTempDetailItem } from './OtherFeeTempDetailTable/typings';
import { OtherFeeTempDirectoryItem } from './OtherFeeTempDirectoryTree/typings';
import { TableActionType, ViewContainePropsType } from 'jd-framework-web/package/components';

/**
 * 标准库-其他费模板库 Props
 * @name otherFeeTempDirectoryCurrent 其他费模板库目录 当前选中
 * @name setOtherFeeTempDirectoryCurrent 其他费模板库目录 设置当前选中
 *
 * @name otherFeeTempDetailCurrent 其他费模板库明细 当前选中
 * @name setOtherFeeTempDetailCurrent 其他费模板库明细 设置当前选中
 *
 * @name otherFeeTempDetailTableRef 其他费模板库明细表REF
 */
export type StdOtherFeeTempProps = {
  /** 其他费模板库目录 当前选中 */
  otherFeeTempDirectoryCurrent?: OtherFeeTempDirectoryItem;
  /** 其他费模板库目录 设置当前选中 */
  setOtherFeeTempDirectoryCurrent?: Dispatch<React.SetStateAction<OtherFeeTempDirectoryItem | undefined>>;

  /** 其他费模板库明细 当前选中 */
  otherFeeTempDetailCurrent?: OtherFeeTempDetailItem;
  /** 其他费模板库明细 设置当前选中 */
  setOtherFeeTempDetailCurrent?: Dispatch<React.SetStateAction<OtherFeeTempDetailItem | undefined>>;

  /** 其他费模板库明细表REF */
  otherFeeTempDetailTableRef?: TableActionType;

  /** 操作栏 插槽 */
  toolbarSlot?: ReactNode;
  /** 是否只读 */
  readonly?: boolean;
};

/** 其他费模板库 PROPS */
export type PropsStdOhterOtherTemp = {
  /** 其他费模板库目录 当前选中 */
  otherFeeTempDirectoryCurrent?: OtherFeeTempDirectoryItem;
  /** 其他费模板库目录 设置当前选中 */
  setOtherFeeTempDirectoryCurrent?: Dispatch<React.SetStateAction<OtherFeeTempDirectoryItem | undefined>>;
  /** 拆分面板高度自适应 */
  splitScroll?: ViewContainePropsType['scroll'];
  /** 拆分面板左侧宽度 */
  splitLWidth?: number;

  /** 操作栏 插槽 */
  toolbarSlot?: ReactNode;
  /** 是否只读 */
  readonly?: boolean;
};
