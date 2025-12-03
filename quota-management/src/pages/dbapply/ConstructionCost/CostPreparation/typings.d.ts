/*
 * @Author: SHUANG
 * @Date: 2024-01-11 11:28:28
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-19 11:25:06
 * @Description: 工程造价-造价编制
 */

import { Dispatch, SetStateAction } from 'react';

import { BaseTableProps, TableActionType, TreeActionType } from 'jd-framework-web/package/components';
import { InventoryDirectoryItem } from './InventoryDirectory/typings';
import { InventoryItem } from './InventoryTable/typings';

/**  引用标准综合单价库 */
import { UnitPriceDetailItem } from '@/pages/standard/StdUnitPrice/UnitPriceDetailTable/typings';
import { UnitPriceNormItem } from '@/pages/standard/StdUnitPrice/UnitPriceNormTable/typings';

import { ConstructionCostProps } from '../typings';

/** 造价编制模块 PROPS */
type CostPreparationProps = {
  /** 分部分项清单目录 REF  */
  inventoryDirectoryTreeRef?: TreeActionType;
  /** 分部分项清单目录 当前选中 */
  inventoryDirectoryCurrent?: InventoryDirectoryItem;
  /** 分部分项清单目录 设置当前选中 */
  setInventoryDirectoryCurrent?: Dispatch<SetStateAction<InventoryDirectoryItem | undefined>>;

  /** 分部分项清单明细表 REF */
  inventoryTableRef?: TableActionType;
  /** 分部分项清单明细表 当前选中 */
  inventoryCurrent?: InventoryItem;
  /** 分部分项清单明细表 设置当前选中 */
  setInventoryCurrent?: Dispatch<SetStateAction<InventoryItem | undefined>>;
  /** 分部分项清单明细表 当前操作 */
  inventoryActionCurrent?: InventoryItem;
  /** 分部分项清单明细表 设置当前操作 */
  setInventoryActionCurrent?: Dispatch<SetStateAction<InventoryItem | undefined>>;
  /** 分部分项清单明细表 当前勾选 */
  inventorySelection?: InventoryItem[];
  /** 分部分项清单明细表 设置当前勾选 */
  setInventorySelection?: Dispatch<SetStateAction<InventoryItem[] | undefined>>;

  /** 综合单价表 REF */
  unitPriceDetailTableRef?: TableActionType;
  /** 综合单价明细 当前选中 */
  unitPriceDetailCurrent?: UnitPriceDetailItem;
  /** 综合单价明细 设置当前选中 */
  setUnitPriceDetailCurrent?: Dispatch<React.SetStateAction<UnitPriceDetailItem | undefined>>;
  /** 综合单价明细 当前选中操作 */
  unitPriceDetailActionCurrent?: UnitPriceDetailItem;
  /** 综合单价明细 设置当前选中操作 */
  setUnitPriceDetailActionCurrent?: Dispatch<React.SetStateAction<UnitPriceDetailItem | undefined>>;
  /** 综合单价清单明细 当前勾选 */
  unitPriceDetailSelection?: UnitPriceDetailItem[];
  /** 综合单价清单明细 设置当前勾选 */
  setUnitPriceDetailSelection?: Dispatch<React.SetStateAction<UnitPriceDetailItem[] | undefined>>;

  /** 综合单价 定额表 REF */
  unitPriceNormTableRef?: TableActionType;
  /** 综合单价定额 当前选中 */
  unitPriceNormCurrent?: UnitPriceNormItem;
  /** 综合单价定额 设置当前选中 */
  setUnitPriceNormCurrent?: Dispatch<React.SetStateAction<UnitPriceNormItem | undefined>>;
  /** 综合单价定额 当前选中操作 */
  unitPriceNormActionCurrent?: UnitPriceNormItem;
  /** 综合单价定额 设置当前选中操作 */
  setUnitPriceNormActionCurrent?: Dispatch<React.SetStateAction<UnitPriceNormItem | undefined>>;
  /** 综合单价清单定额 当前勾选 */
  unitPriceNormSelection?: UnitPriceNormItem[];
  /** 综合单价清单定额 设置当前勾选 */
  setUnitPriceNormSelection?: Dispatch<React.SetStateAction<UnitPriceNormItem[] | undefined>>;

  /** readonly 模块是否只读 */
  readonly?: boolean;

  /** auditStatus 是否是审核状态 */
  auditStatus?: boolean;

  tableProps?: Partial<BaseTableProps>;
} & ConstructionCostProps;
