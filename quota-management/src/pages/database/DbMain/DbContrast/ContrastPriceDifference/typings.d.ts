/*
 * @Author: SHUANG
 * @Date: 2023-11-08 15:00:22
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-11-17 09:00:26
 * @Description: 企业定额修编-价格差异对比
 */

/** 价格差异对比 查询参数 */
export type DbNormPriceDifferenceQuery = {
  beforeDbId: string; // 先勾选的DbId
  afterDbId: string; // 后勾选的DbId
};

/** 价格差异对比 数据项 */
/** 先勾选的就是当前库 后的就是来源。 */
export type DbNormPriceDifferenceItem = {
  currentNormCode: string; //	定额编号当前库
  currentNormName: string; //	定额名称当前库
  currentCompleteNormName: string; //	完整定额名称当前库
  currentNormUnit: string; //	定额单位当前库
  currentNormPrice: string; //	定额基价当前库
  currentNormManPrice: string; //	定额人工费当前库
  currentNormMatPrice: string; //	定额材料费当前库
  currentNormMacPrice: string; //	定额机械费当前库
  sourceNormCode: string; //	定额编号来源库
  sourceNormName: string; //	定额名称来源库
  sourceCompleteNormName: string; //	完整定额名称来源库
  sourceNormUnit: string; //	定额单位来源库
  sourceNormPrice: string; //	定额基价来源库
  sourceNormManPrice: string; //	定额人工费来源库
  sourceNormMatPrice: string; //	定额材料费来源库
  sourceNormMacPrice: string; //	定额机械费来源库
  normPriceDifference: string; //	定额基价差值
  normManPriceDifference: string; //	定额人工费差值
  normMatPriceDifference: string; //	定额材料费差值
  normMacPriceDifference: string; //	定额机械费差值
  normPricePercentage: number; //	定额基价百分比
  normManPricePercentage: number; //	定额人工费百分比
  normMatPricePercentage: number; //	定额材料费百分比
  normMacPricePercentage: number; //	定额机械费百分比
};
