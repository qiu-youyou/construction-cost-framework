/*
 * @Author: SHUANG
 * @Date: 2024-02-22 09:16:33
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-02-22 11:50:21
 * @Description: 取费模板库
 */

import { DatabaseDbItem } from '../DbMain/DatabaseMain/typings';

export type DbFeeDatabaseItem = DatabaseDbItem & {
  feeCode: string; // 取费编码
  feeName: string; // 取费全称
  feePhase: string; // 取费阶段
  feeNote: string; // 取费备注
  sourceDb: string; // 来源库
  sourceId: string; // 来源ID
  dbIndustryCode: string; // 行业代码
  dbIndustryName: string; // 行业名称
  id: string;
};

export type DbFeeDatabaseCopy = {
  sourceDbId: string; // 库id
  targetName: string; // 目标名称
  billSort: string; // 复制行的BillSort
};
