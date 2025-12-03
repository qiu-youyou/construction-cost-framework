/*
 * @Author: SHUANG
 * @Date: 2024-03-14 15:17:22
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-03-28 14:19:59
 * @Description: 工程造价-人材机汇总与调价
 */

import { Dispatch, SetStateAction } from 'react';
import { TableActionType } from 'jd-framework-web/package/components';

import { MatSumDirectoryItem } from './MatDirectoryTree/services';
import { MatSummaryItem } from './MatSummaryTable/typings';
import { ConstructionCostProps } from '../typings';

/** 工程造价-人材机汇总与调价 向下PROPS */
export type MatSummaryProps = {
  /** 人材机目录 当前选中、设置当前选中 */
  matDirectoryCurrent?: MatSumDirectoryItem;
  setMatDirectoryCurrent?: Dispatch<SetStateAction<MatSumDirectoryItem | undefined>>;

  /** 人材机汇总明细 当前选中、设置当前选中 */
  matSummaryCurrent?: MatSummaryItem;
  setMatSummaryCurrent?: Dispatch<SetStateAction<MatSummaryItem | undefined>>;

  /** 人材机汇总明细表 REF */
  matSummaryTableRef?: TableActionType;
} & ConstructionCostProps;
