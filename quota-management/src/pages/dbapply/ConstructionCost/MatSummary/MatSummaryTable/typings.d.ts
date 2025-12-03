/*
 * @Author: SHUANG
 * @Date: 2024-03-14 15:20:10
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-26 08:53:36
 * @Description: 工程造价-人材机汇总与调价 表
 */

/** 工程造价-人材机汇总与调价 表 查询 */
export type MatSummaryQuery = {
  projectId: string; // 工程ID
  stageId: string; // 阶段ID
  matRcjType?: string; // 目录类型
  matCode?: string; // 材料编号
  matIsMain?: string; // 主材
};

/** 工程造价-人材机汇总与调价 表 数据项 */
export type MatSummaryItem = {
  id: string;
  spreads: string; // 价差
  spreadTot: string; // 价差合价
  matCode: string; // 材料编号
  matName: string; // 材料名称
  matUnit: string; // 材料单位
  matPrice: string; // 材料单价
  matAmount: string; // 单位用量
  matMarkPrice: string; // 材料单价市场价
  matMarkTotPrice: string; // 材料合价市场价
  matTypeName: string; // 材料分类
  matIsMain: string; // 主材
  projectId: string; // 工程ID
  stageId: string; // 阶段ID
  matTypeCode: string;
  matTypeUnit: string;
  matTypeId: string;
  hasChildren?: boolean;
};

/** 工程造价-人材机汇总与调价 相关定额 数据项*/
export type MatSummaryNormItem = {
  normCode: string; // 定额编码
  completeNormName: string; // 定额全名称
  normUnit: string; // 定额单位
  matAmountSrc: string; // 材料工程量
  normName: string; // 定额名称
  projectId: string; // 工程ID
  stageId: string; // 阶段ID
  id: string;
};

/** 工程造价-人材机汇总与调价 相关清单 查询 */
export type MatSummaryInventroyQuery = {
  projectId: string; // 工程ID
  stageId: string; // 阶段ID
};

/** 工程造价-人材机汇总与调价 材料汇总 */
export type MatTypeSummaryItem = {
  matTypeCode: string; // 编码
  matTypeName: string; // 名称
  matTypeUnit: string; // 单位
  number: string; // 数量
};

/** 工程造价-人材机汇总与调价 材料汇总 */
export type MatSummaryUpdateByMultiformMechanical = {
  projectId: string; // 项目ID
  stageId: string; // 阶段ID
  multiformMechanicalId: string; // 组时费ID
  matCode: string; // 材料编号
  matName: string; // 材料名称
  matUnit: string; // 材料单位
  matPrice: string; // 材料单价
  matIsMain: string; // 主材标识
  matMarkPrice: string; // 材料单价_市场价
  matTypeName: string; // 材料分类
};
