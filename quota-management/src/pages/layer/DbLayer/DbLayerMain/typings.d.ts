/*
 * @Author: SHUANG
 * @Date: 2023-11-17 14:36:58
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-11-20 14:20:57
 * @Description: 全费用定额测算
 */

import { DbChapterItem } from '@/pages/database/DbMain/DatabaseMain/DbChapterTree/typings';
import { DbLayerNormItem } from './DbLayerNormTable/typings';
import { Dispatch } from 'react';
import { TableActionType } from 'jd-framework-web/package/components';

/**
 * DbLayerProps
 * @name dbLayerCurrent 层级设置 当前选中层级
 * @name dbChapterCurrent 层级设置 当前选中册章节
 *
 * @name dbLayerNormCurrent 层级设置定额明细 当前选中
 * @name setDbLayerNormCurrent 层级设置定额明细 设置当前选中
 */
export type DbLayerProps = {
  /** 层级设置 当前选中层级 */
  dbLayerCurrent?: DbLayerItem;
  /** 层级设置 当前选中册章节 */
  dbChapterCurrent?: DbChapterItem;

  /** 层级设置定额明细 当前选中 */
  dbLayerNormCurrent?: DbLayerNormItem;
  /** 层级设定额明细 设置当前选中 */
  setDbLayerNormCurrent?: Dispatch<React.SetStateAction<DbLayerNormItem | undefined>>;
  /** 层级设置定额明细 当前勾选 */
  dbLayerNormSelection?: DbLayerNormItem[];
  /** 层级设置定额明细 设置当前勾选 */
  setDbLayerNormSelection?: Dispatch<React.SetStateAction<DbLayerNormItem[] | undefined>>;
  /** 层级设置定额明细 TABLE REF */
  dbLayerNormTableRef?: TableActionType;

  /** 层级设置定额取费明细 TABLE REF */
  dbLayerNormFeeTableRef?: TableActionType;
};

/** 全费用定额测算 层级 数据项 */
export type DbLayerItem = {
  billSort: string; // 顺序
  billStatus: string; // 状态
  createDatetime: string; // 创建时间
  createMan: string; // 创建人
  createManId: string; // 创建人ID
  dbCode: string; // 定额库编号
  dbId: string; // 定额库ID
  dbName: string; // 定额库全称
  dbSimple: string; // 定额库简称
  id: string; // 主键
  layerName: string; // 层级名称
};

/** 全费用定额测算 保存参数 */
export type DbLayerSave = {
  dbId: string; // 定额库ID
  layerName: string; // 层级名称
};

/** 额层级设置 - 批量设置取费 按册传入 chapterID 按定额 传入 layerId */
export type DbLayerUpdateNormFeeType = {
  dbId: string; // 定额库ID
  feeId: string; // 取费 ID
  layerId: string; // 层ID
  normFeeTypeCode: string; // 取费ID
  normFeeTypeName: string; // 取费名称
  chapterId?: string; // 章节目录ID
  ids?: string; // 定额ID
};
