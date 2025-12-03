/*
 * @Author: SHUANG
 * @Date: 2024-04-17 15:12:15
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-18 10:56:41
 * @Description: 人材机临时库
 */

import { DbNormMatContentItem } from '@/pages/database/DbMain/DatabaseMain/DataBasePane/DbNorm/DbNormPane/DbNormMatContent/typings';
import { TableActionType } from 'jd-framework-web/package/components';

/** 数据项 */
export type TempNormMatItem = DbNormMatContentItem & {
  productName: string; //	产品名称
  projectCode: string; //	项目编码
  projectId: string; //	项目ID
  projectName: string; //	项目名称
  stageId: string; //	阶段ID
  stageName: string; //	阶段名称
  unitPriceId: string; //	项目综合单价ID
  syncDatabaseStatus?: 'Y' | 'N';
};

/** 接受 */
export type TempNormMatAcceptParams = {
  projectIds: string[]; // 项目ID集合
  stageIds: string[]; // 阶段ID集合
  ids: string[]; // 人材机ID集合
  unitPriceIds: string[]; // 综合单价ID集合
  unitPriceNormIds: string[]; // 定额ID集合
  classifyId: string; // 当前选中人材机目录的ID
  dbId: string; // 当前选中定额库的ID
};

/** 拒绝 */
export type TempNormMatRejectParams = {
  projectIds: string[]; // 项目ID集合
  stageIds: string[]; // 阶段ID集合
  ids: string[]; // 人材机ID集合
  unitPriceIds: string[]; // 综合单价ID集合
  unitPriceNormIds: string[]; // 定额ID集合
};

export type TempNormMatProps = {
  /** 当前选择 */
  tempNormMatSelection?: TempNormMatItem[];
  /** TABLE REF */
  tempNormMatTableRef?: TableActionType;
};
