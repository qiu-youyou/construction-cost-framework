/*
 * @Author: SHUANG
 * @Date: 2023-11-15 10:26:26
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-18 15:03:43
 * @Description: 标准综合单价库 - 目录
 */
import { Dispatch, ReactNode } from 'react';
import {
  BaseTableProps,
  PaneContainerPropsType,
  TableActionType,
  ViewContainePropsType,
} from 'jd-framework-web/package/components';

import { UnitPriceDirectoryItem } from './UnitPriceDirectoryTree/typings';
import { PropsUnitPriceDetail, UnitPriceDetailItem } from './UnitPriceDetailTable/typings';
import { UnitPriceNormItem } from './UnitPriceNormTable/typings';

/**
 * 综合单价库 向下传递 Props
 * @name unitPriceDirectoryCurrent 综合单价目录 当前选中
 * @name setUnitPriceDirectoryCurrent 综合单价目录 设置当前选中
 *
 * @name unitPriceDetailCurrent 综合单价清单明细 当前选中
 * @name setUnitPriceDetailCurrent 综合单价清单明细 设置当前选中
 * @name unitPriceDetailActionCurrent 综合单价清单明细 当前选中操作
 * @name setUnitPriceDetailActionCurrent 综合单价清单明细 设置当前选中操作
 *
 * @name unitPriceNormCurrent 综合单价清单定额 当前选中
 * @name setUnitPriceNormCurrent 综合单价清单定额 设置当前选中
 * @name unitPriceNormActionCurrent 综合单价清单定额 当前选中操作
 * @name setUnitPriceNormActionCurrent 综合单价清单定额 设置当前选中操作
 *
 * @name unitPriceDetailTableRef 综合单价清单明细表 REF
 * @name unitPriceNormTableRef 综合单价清单定额表 REF
 */
export type StdUnitPriceProps = {
  /** 综合单价目录 当前选中  */
  unitPriceDirectoryCurrent?: UnitPriceDirectoryItem;
  /** 综合单价目录 设置当前选中 */
  setUnitPriceDirectoryCurrent?: Dispatch<React.SetStateAction<UnitPriceDirectoryItem | undefined>>;

  /** 综合单价清单明细 当前选中 */
  unitPriceDetailCurrent?: UnitPriceDetailItem;
  /** 综合单价清单明细 设置当前选中 */
  setUnitPriceDetailCurrent?: Dispatch<React.SetStateAction<UnitPriceDetailItem | undefined>>;
  /** 综合单价清单明细 当前选中操作 */
  unitPriceDetailActionCurrent?: UnitPriceDetailItem;
  /** 综合单价清单明细 设置当前选中操作 */
  setUnitPriceDetailActionCurrent?: Dispatch<React.SetStateAction<UnitPriceDetailItem | undefined>>;

  /** 综合单价清单定额 当前选中 */
  unitPriceNormCurrent?: UnitPriceNormItem;
  /** 综合单价清单定额 设置当前选中 */
  setUnitPriceNormCurrent?: Dispatch<React.SetStateAction<UnitPriceNormItem | undefined>>;
  /** 综合单价清单定额 当前选中操作 */
  unitPriceNormActionCurrent?: UnitPriceNormItem;
  /** 综合单价清单定额 设置当前选中操作 */
  setUnitPriceNormActionCurrent?: Dispatch<React.SetStateAction<UnitPriceNormItem | undefined>>;
  /** 综合单价清单定额 当前勾选 */
  unitPriceNormSelection?: UnitPriceNormItem[];
  /** 综合单价清单定额 设置当前勾选 */
  setUnitPriceNormSelection?: Dispatch<React.SetStateAction<UnitPriceNormItem[] | undefined>>;

  /** 综合单价清单明细表 REF */
  unitPriceDetailTableRef?: TableActionType;
  /** 综合单价清单定额表 REF */
  unitPriceNormTableRef?: TableActionType;
} & PropsStdUnitPrice;

/** 综合单价库 接收 PROPS */
export type PropsStdUnitPrice = {
  /** 面板设置 */
  viewContaineProps?: ViewContainePropsType;
  paneContainerProps?: PaneContainerPropsType;
  /** 操作栏 插槽 */
  toolbarSlot?: ReactNode;
  /** 综合单价清单明细 当前勾选 */
  unitPriceDetailSelection?: UnitPriceDetailItem[];
  /** 综合单价清单明细 设置当前勾选 */
  setUnitPriceDetailSelection?: Dispatch<React.SetStateAction<UnitPriceDetailItem[] | undefined>>;
  /** 综合单价清单明细 设置当前 */
  setUnitPriceDetailCurrent?: Dispatch<React.SetStateAction<UnitPriceDetailItem | undefined>>;
  propsUnitPriceDetail?: PropsUnitPriceDetail;
  /** 综合单价章节 设置当前勾选 */
  setUnitPriceDirectoryCurrent?: React.Dispatch<React.SetStateAction<UnitPriceDirectoryItem | undefined>>;
};
