/*
 * @Author: SHUANG
 * @Date: 2023-11-10 11:13:32
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-02-28 16:13:27
 * @Description: 标准库-项目汇总表
 */

import { Dispatch, ReactNode } from 'react';
import { TableActionType, ViewContainePropsType } from 'jd-framework-web/package/components';
import { OtherFeeTempDirectoryItem } from '../StdOtherFeeTemp/OtherFeeTempDirectoryTree/typings';
import { OtherFeeTempDetailItem } from '../StdOtherFeeTemp/OtherFeeTempDetailTable/typings';

/**
 * 标准库-项目汇总表 Props
 * @name otherFeeTempDirectoryCurrent 项目汇总表目录 当前选中
 * @name setOtherFeeTempDirectoryCurrent 项目汇总表目录 设置当前选中
 *
 * @name otherFeeTempDetailCurrent 项目汇总表明细 当前选中
 * @name setOtherFeeTempDetailCurrent 项目汇总表明细 设置当前选中
 *
 * @name otherFeeTempDetailTableRef 项目汇总表明细表REF
 */
export type StdOtherSumTempProps = {
  /** 项目汇总表目录 当前选中 */
  otherSumTempDirectoryCurrent?: OtherFeeTempDirectoryItem;
  /** 项目汇总表目录 设置当前选中 */
  setOtherSumTempDirectoryCurrent?: Dispatch<React.SetStateAction<OtherFeeTempDirectoryItem | undefined>>;

  /** 项目汇总表明细 当前选中 */
  otherSumTempDetailCurrent?: OtherFeeTempDetailItem;
  /** 项目汇总表明细 设置当前选中 */
  setOtherSumTempDetailCurrent?: Dispatch<React.SetStateAction<OtherFeeTempDetailItem | undefined>>;

  /** 项目汇总表明细表REF */
  otherSumTempDetailTableRef?: TableActionType;

  /** 操作栏 插槽 */
  toolbarSlot?: ReactNode;
  /** 是否只读 */
  readonly?: boolean;
};

/** 项目汇总模板库 PROPS */
export type PropsStdOhterSumTemp = {
  /** 是否只读 */
  readonly?: boolean;
  /** 操作栏 插槽 */
  toolbarSlot?: ReactNode;
  /** 项目汇总表目录 当前选中 */
  otherSumTempDirectoryCurrent?: OtherFeeTempDirectoryItem;
  /** 项目汇总表目录 设置当前选中 */
  setOtherSumTempDirectoryCurrent?: Dispatch<React.SetStateAction<OtherFeeTempDirectoryItem | undefined>>;

  /** 拆分面板高度自适应 */
  splitScroll?: ViewContainePropsType['scroll'];
  /** 拆分面板左侧宽度 */
  splitLWidth?: number;
};
