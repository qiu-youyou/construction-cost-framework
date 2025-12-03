/*
 * @Author: SHUANG
 * @Date: 2023-10-30 10:12:37
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-11-09 09:06:38
 * @Description: 取费修编-取费目录
 */

/** 取费目录查询参数 */
export interface DbFeeDirectoryQuery {
  dbId: string; // 定额库ID
}

/** 取费目录 数据项 */
export type DbFeeDirectoryItem = {
  dbCode: string; // 无
  dbId: string; // 定额库ID
  dbPhase: string; // 阶段(冗余字段)
  dbSimple: string; // 库简称(冗余字段)
  feeDirectoryCode: string; // 取费目录编码
  feeDirectoryCodeOld: string; // 取费目录编码(老的)
  feeDirectoryLog: string; // 取费修改记录
  feeDirectoryName: string; // 取费目录全称
  feeDirectoryNameOld: string; // 取费目录全称(老的)
  feeDirectorySimple: string; // 取费目录简称
  feeDirectorySimpleOld: string; // 取费目录简称(老的)
  id: string; // 无
  parentId: string; // 无
  children?: DbFeeDirectoryItem[];
};

/** 取费目录保存参数 */
export type DbFeeDirectorySaveParams = {
  dbId: string; // 库id
  parentId: string; // 父id
  feeDirectoryName: string; // 目录名称
  dbCode: string; // 库编码
  dbSimple: string; // 库简称
  dbPhase: string; // 阶段
};

/** 取费目录复制 */
export type DbFeeDirectoryPasteParams = {
  copyIds: string[]; //	要复制的主键集合
  dbId: string; //	要复制的库id
  currentDbId: string; //	目标库id
  parentId: string; //	目标行的父id
};
