/*
 * @Author: SHUANG
 * @Date: 2024-03-12 17:40:33
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-03-12 17:45:17
 * @Description: 工程造价-工程量清单编制-定额 - 子目取费
 */

/** 子目取费 查询参数 */
export type ProductNormFeeQuery = {
  unitPriceId: string; // 综合单价库ID
  projectId: string; // 项目ID
  stageId: string; // 阶段ID
  unitPriceNormId: string; // 综合单价定额ID
};
