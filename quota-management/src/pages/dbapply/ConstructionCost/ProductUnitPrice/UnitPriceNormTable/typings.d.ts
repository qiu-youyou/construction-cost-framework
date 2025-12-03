/*
 * @Author: SHUANG
 * @Date: 2024-03-07 16:14:24
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-03-14 14:26:04
 * @Description:  工程造价-工程量清单编制-综合单价 - 定额
 */

/** 工程造价-工程量清单编制-综合单价 定额 查询 */
export type ProductUnitPriceNormQuery = {
  unitPriceId: string; // 综合单价库ID
  projectId: string; // 项目ID
  stageId: string; // 阶段ID
};

/** 工程造价-工程量清单编制-综合单价 定额 保存参数 */
export type ProductUnitPriceNormSave = {
  ids: string[]; // 定额行ID
  unitPriceId: string; //	综合单价库ID
  projectId: string; //	项目ID
  stageId: string; //	阶段ID
  dbId: string; //
};

/** 工程造价-工程量清单编制-综合单价 定额  批量设置取费类型 */
export type UpdateBatchSetFeeParams = {
  projectId: string; // 	项目ID
  stageId: string; // 	阶段ID
  unitPriceId: string; // 	综合单价ID
  ids: string; // 	定额ID
  feeDirectoryId: string; // 	定额取费目录ID
  feeId: string; // 	取费表ID
};

export type UpdateBatchSetRateParams = {
  projectId: string; // 项目ID
  stageId: string; // 阶段ID
  unitPriceId: string; // 综合单价ID
  ids: string[]; // 定额ID
  normPriceRate: string; // 定额单价系数
  normManPriceRate: string; // 定额人工系数
  normMatPriceRate: string; // 定额材料系数
  normMacPriceRate: string; // 定额机械系数
  scope: string; // 范围(selected:选中行)
};
