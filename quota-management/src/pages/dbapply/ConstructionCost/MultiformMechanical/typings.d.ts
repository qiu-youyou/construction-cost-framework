/*
 * @Author: SHUANG
 * @Date: 2024-03-25 16:40:29
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-03 13:45:41
 * @Description: 工程造价-机械台班组时费
 */

import { Dispatch, SetStateAction } from 'react';
import { BaseTableProps, TableActionType } from 'jd-framework-web/package/components';
import { MultiformMechanicalItem } from './MultiformMechanicalTable/typings';

/** 工程造价-组时机械定义 PROPS */
export type MultiformMechanicalProps = {
  /** REF */
  multiformMechanicalTableRef?: TableActionType;
  /** 组时机械、当前 设置当前 */
  multiformMechanicalCurrent?: MultiformMechanicalItem;
  setMultiformMechanicalCurrent?: Dispatch<SetStateAction<MultiformMechanicalItem | undefined>>;

  tableProps?: Partial<BaseTableProps>;
  readonly?: boolean;
};
