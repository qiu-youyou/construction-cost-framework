/*
 * @Author: SHUANG
 * @Date: 2023-11-08 15:00:22
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-11-17 11:18:42
 * @Description: 企业定额修编-造价水平对比-按章节
 */

/** 造价水平对比-按章节 查询参数 */
export type DbPriceLevelByChapterQuery = {
  beforeDbId: string; // 先勾选的DbId
  afterDbId: string; // 后勾选的DbId
};

/** 造价水平对比-按章节 数据项 */
export type DbPriceLevelByChapterItem = {
  dbSimple: string; // 库简称(冗余字段)
  dbPhase: string; // 阶段(冗余字段)
  chapterCode: string; // 章节目录编码
  chapterName: string; // 章节目录全称
  normFeeTypeName: string; // 取费名称
  chapterSimple: string; // 章节目录简称
  normFeeTypeId: string; // 取费ID
  chapterLog: string; // 章节修改记录
  chapterCodeOld: string; // 章节目录编码(老的)
  chapterNameOld: string; // 章节目录全称(老的)
  chapterSimpleOld: string; // 章节目录简称(老的)
  normFeeTypeNameOld: string; // 取费名称(老的)
  normFeeTypeIdOld: string; // 取费ID(老的)
  sourceDbId: string; // 来源ID
  normPricePercentage: number; // 定额基价百分比
  normManPricePercentage: number; // 定额人工费百分比
  normMatPricePercentage: number; // 定额材料费百分比
  normMacPricePercentage: number; // 定额机械费百分比
};
