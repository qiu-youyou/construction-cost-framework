/*
 * @Author: SHUANG
 * @Date: 2024-03-13 09:47:33
 * @LastEditors: lmc 1551943635@qq.com
 * @LastEditTime: 2024-04-24 10:56:45
 * @Description: 工程造价-综合单价
 */

import { Dispatch } from 'react';
import { BaseCardProps, BaseTableProps, TableActionType } from 'jd-framework-web/package/components';
import { UnitPriceDetailItem } from '@/pages/standard/StdUnitPrice/UnitPriceDetailTable/typings';

/** 项目综合单价 PROPS */
export type ProductUnitPriceProps = {
  /** 是否从单价编码查询 */
  isByUnitPriceCode?: boolean;

  /**  单价编码 */
  unitPriceCode?: string;

  /** BaseCard PROPS */
  cardProps?: BaseCardProps;

  /** 综合单价明细 当前选中操作 */
  unitPriceDetailActionCurrent?: UnitPriceDetailItem;

  /** 综合单价明细 设置当前选中操作 */
  setUnitPriceDetailActionCurrent?: Dispatch<React.SetStateAction<UnitPriceDetailItem | undefined>>;

  /** 综合单价明细表 Table Props */
  unitPriceDetailTableProps?: Partial<BaseTableProps>;

  /** 模块是否只读 */
  readonly?: boolean;

  /**分布分项明细表 REF */
  inventoryTableRef?: TableActionType;
};
