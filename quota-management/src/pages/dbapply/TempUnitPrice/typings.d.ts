/*
 * @Author: SHUANG
 * @Date: 2024-04-17 15:12:15
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-18 14:15:07
 * @Description: 综合单价临时库
 */

import { UnitPriceDetailItem } from '@/pages/standard/StdUnitPrice/UnitPriceDetailTable/typings';
import { TableActionType } from 'jd-framework-web/package/components';

/** 数据项 */
export type TempUnitPriceItem = UnitPriceDetailItem & {
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
export type TempUnitPriceAccepParams = {
  projectIds: string[]; // 项目ID
  stageIds: string[]; // 阶段ID
  ids: string[]; // 综合单价ID
  unitPriceDbId: string; // 标准综合单价库目录ID
  unitPriceId: string; // 标准综合单价行ID
};

/** 拒绝 */
export type TempUnitPriceRejectParams = {
  projectIds: string[]; // 项目ID
  stageIds: string[]; // 阶段ID
  ids: string[]; // 综合单价ID
};

export type TempUnitPriceProps = {
  /** 当前选择 */
  tempUnitPriceSelection?: TempUnitPriceItem[];
  /** TABLE REF */
  tempUnitPriceTableRef?: TableActionType;
};
