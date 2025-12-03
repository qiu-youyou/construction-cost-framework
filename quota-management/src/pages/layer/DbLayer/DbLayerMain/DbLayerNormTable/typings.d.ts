/*
 * @Author: SHUANG
 * @Date: 2023-11-17 15:54:46
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-11-17 17:04:37
 * @Description: 全费用定额测算 - 定额明细
 */

/** 全费用定额测算 - 定额明细 - 查询参数 */
export type DbLayerNormQuery = {
  dbId: string; // 定额库ID
  chapterId: string; // 章节ID
  layerId: string; // 层ID
};

/** 全费用定额测算 - 定额明细 - 数据项 */
export type DbLayerNormItem = {
  chapterId: string; // 章节ID
  completeNormName: string; // 定额参数
  createDatetime: string; // 创建时间
  createMan: string; // 创建人
  createManId: string; // 创建人ID
  dbId: string; // 定额库ID
  id: string; // 主键
  layerId: string; // 层级ID
  normBasisDiff: string; // 基价价差
  normCode: string; // 定额编号
  normComprehensivePrice: string; // 综合单价
  normComprehensivePriceTotal: string; // 综合合价
  normDirectFee: string; // 直接费
  normFeeTypeCode: string; // 取费类型ID
  normFeeTypeName: string; // 取费类型名称
  normIndirectFee: string; // 间接费
  normMacPrice: string; // 定额机械单价
  normManPrice: string; // 定额人工单价
  normManageFee: string; // 管理费
  normMatPrice: string; // 定额材料单价
  normName: string; // 定额名称
  normPrice: string; // 定额单价
  normProfitFee: string; // 利润
  normTaxationFee: string; // 税金
  normUnit: string; // 定额单位
};
