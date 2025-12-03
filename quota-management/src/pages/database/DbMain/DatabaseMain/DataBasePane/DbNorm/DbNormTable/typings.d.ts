/*
 * @Author: SHUANG
 * @Date: 2023-10-18 13:45:55
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-03-22 11:51:59
 * @Description: 企业定额维护-定额
 */

/** 查询定额明细需要的参数 */
export interface DbNormQuery {
  dbId: string; // 库ID
  chapterId: string; // 册ID
}

/** 定额明细数据兼容字段 */
export type DbNormExtend = DbNormQuery & {
  dbCode: string; // 库编码(冗余字段)
  dbSimple: string; // 库简称(冗余字段)
  dbPhase: string; // 阶段(冗余字段)
  chapterCode: string; // 章节编码(冗余字段)
  chapterName: string; // 章节全称(冗余字段)
  chapterSimple: string; // 目录简称
};

/** 定额明细数据项 */
export type DbNormItem = DbNormExtend & {
  normCode: string; // 定额编号
  normName: string; // 定额名称
  completeNormName: string; // 定额名称参数
  normUnit: string; // 定额单位
  normPrice: string; // 定额基价
  normManPrice: string; // 定额人工费
  normMatPrice: string; // 定额材料费
  normMacPrice: string; // 定额机械费
  normComprehensivePrice: string; // 定额综合单价
  normLog: string; // 定额修改记录
  billSort: string;
  id: string;

  businessId?: string; // 基础定额库 会有该字段
};

/** 定额明细新增空行参数 */
export type DbNormSaveParams = DbNormExtend;

/** 定额明细粘贴参数 */
export type DbNormPasteParams = FETCH.Paste & {
  chapterId: string; // 册Id
  dbId: string; // 库ID
  currentChapterId: string; // 选中行的册ID
  currentDbId: string; // 选中库ID
  chapterSimple: string;
};

/** 明细扩展表(注，工作内容，适用范围)查询 */
export interface DbNormExtQuery {
  id: string; // 定额明细id
  dbId: string; // 库ID
  chapterId: string; // 册ID
}

/** 明细扩展表(注，工作内容，适用范围)内容 */

/**  'normWorkContent' 定额工作内容 | 'normScope' 适用范围 | 'normAnnotate' 注 */
export type DbNormExtItemKey = 'normWorkContent' | 'normScope' | 'normAnnotate';

export type DbNormExtItem = {
  normWorkContent: string; // 定额工作内容
  normScope: string; // 适用范围
  normAnnotate: string; // 注
};

/** 定额系数调整 参数 */
export type DbNormAdjustParams = {
  ids: string[]; // 选中行Id
  chapterId: string; // 册ID
  dbId: string; // 库ID
  normManQ: string; // 人工系数
  normMatQ: string; // 	材料系数
  normMacQ: string; // 	机械系数
  coefficientType: string; // 1 =册调整系数 2 勾选调整系数
};
