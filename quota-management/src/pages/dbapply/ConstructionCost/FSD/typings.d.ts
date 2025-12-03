/*
 * @Author: SHUANG
 * @Date: 2024-04-15 18:20:36
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-26 11:28:11
 * @Description: 工程造价-风水电
 */

import { Dispatch, SetStateAction } from 'react';
import { FSDElectricityItem } from './FSDElectricity/typings';
import { FSDWaterItem } from './FSDWater/typings';
import { FSDWindItem } from './FSDWind/typings';
import { FsdItem } from './FSDMain/typings';
import { BaseTableProps, TableActionType } from 'jd-framework-web/package/components';

/** 1[风]、2[水]、3[电] */
export type MatTypeKey = '1' | '2' | '3';

/** 工程造价-风水电 查询 */
export type FSDQuery = {
  projectId: string; // 工程ID
  stageId: string; // 阶段ID
  matId: string; // 材料ID
};

/** 工程造价-风水电 向下PROPS */
export type FsdProps = {
  /** 当前pane */
  matType?: MatTypeKey;
  /** 风水电 当前、设置当前 */
  fsdCurrent?: FsdItem;
  setFsdCurrent?: Dispatch<SetStateAction<FsdItem | undefined>>;
  FSDMainTableProps?: Partial<BaseTableProps>;

  /** 施工用电 当前、设置当前 */
  fsdElectricityCurrent?: FSDElectricityItem;
  setFsdElectricityCurrent?: Dispatch<SetStateAction<FSDElectricityItem | undefined>>;

  /** 施工用风 当前、设置当前 */
  fsdWindCurrent?: FSDWindItem;
  setFsdWindCurrent?: Dispatch<SetStateAction<FSDWindItem | undefined>>;

  /** 施工用水 当前、设置当前 */
  fsdWaterCurrent?: FSDWaterItem;
  setFsdWaterCurrent?: Dispatch<SetStateAction<FSDWaterItem | undefined>>;

  /** 风水电主表 REF */
  FSDMainTableRef?: TableActionType;
  /** 供风点信息 REF */
  FSDWindTableRef?: TableActionType;
  /** 供水点信息 REF */
  FSDWaterTableRef?: TableActionType;
  /** 供电点信息 REF */
  FSDElectricityTableRef?: TableActionType;
};
