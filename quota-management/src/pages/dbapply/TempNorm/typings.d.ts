/*
 * @Author: SHUANG
 * @Date: 2024-04-17 15:12:15
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-18 09:57:51
 * @Description: 定额临时库
 */

import { DbNormItem } from '@/pages/database/DbMain/DatabaseMain/DataBasePane/DbNorm/DbNormTable/typings';
import { TableActionType } from 'jd-framework-web/package/components';

/** 数据项 */
export type TempNormItem = DbNormItem & {
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
export type TempNormAcceptParams = {
  projectIds: string[]; // 项目ID集合
  stageIds: string[]; // 阶段ID集合
  ids: string[]; // 定额ID集合
  unitPriceIds: string[]; // 综合单价ID集合
  dbId: string; // 当前选中定额的定额库ID
  chapterId: string; // 当前选中定额的章节ID
};

/** 拒绝 */
export type TempNormRejectParams = {
  projectIds: string[]; // 项目ID集合
  stageIds: string[]; // 阶段ID集合
  ids: string[]; // 定额ID集合
  unitPriceIds: string[]; // 综合单价ID集合
};

export type tempNormProps = {
  /** 当前选择 */
  tempNormSelection?: TempNormItem[];
  /** TABLE REF */
  tempNormTableRef?: TableActionType;
};
