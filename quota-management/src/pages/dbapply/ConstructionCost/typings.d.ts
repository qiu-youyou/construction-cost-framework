/*
 * @Author: SHUANG
 * @Date: 2024-01-11 09:25:32
 * @LastEditors: lmc 1551943635@qq.com
 * @LastEditTime: 2024-04-24 10:56:36
 * @Description: 工程造价编制与校审
 */

import { Dispatch, SetStateAction } from 'react';
import { ProductItem } from '../Product/Product/typings';
import { TableActionType } from 'jd-framework-web/package/components';

/**
 * 当前激活的工程造价 PANE
 */
export type ConstructionCostPaneActive =
  | 'preparation' // preparation[造价编制]
  | 'price' // price[综合单价汇总]
  | 'mechanical' // mechanical[机械台班组时费]
  | 'matsum' // matsum[人材机汇总与调价]
  | 'transport' // transport[运杂费]
  | 'fsd' // 风水电
  | 'pricesum' // pricesum[综合单价汇总]
  | 'subitem' // subitem[分部分项汇总]
  | 'wbs' // wbs[WBS汇总]
  | 'quantity' // quantity[工程量指标汇总]
  | 'otherfee' // otherfee[其他费汇总]
  | 'project' // project[项目汇总]
  | 'docs' // docs[项目文档库]
  | 'report'; // report[报表]

/** 当前工程造价向下传递 PROPS */
export type ConstructionCostProps = {
  /** 工程造价PANE 显示配置 */
  constructionCostPaneItems?: ConstructionCostPaneActive[];

  /** 工程造价PANE 当前激活 */
  constructionCostPaneActive?: ConstructionCostPaneActive;
  /** 工程造价PANE 设置当前激活 */
  setConstructionCostPaneActive?: Dispatch<SetStateAction<ConstructionCostPaneActive>>;

  /** 当前操作产品 */
  productActionCurrent?: ProductItem;

  readonly?: boolean;
};
