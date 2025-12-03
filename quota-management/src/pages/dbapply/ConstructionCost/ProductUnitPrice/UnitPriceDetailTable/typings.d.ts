/*
 * @Author: SHUANG
 * @Date: 2024-03-07 10:10:53
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-03-07 15:10:21
 * @Description: 工程造价-工程量清单编制-综合单价
 */

/** 工程造价-工程量清单编制-综合单价 查询 */
export type ProductUnitPriceQuery = {
  unitPriceCode?: string; // 价格编号
  projectId: string; // 项目ID
  stageId: string; // 阶段ID
};

/** 工程造价-工程量清单编制-综合单价 标准库批量新增到项目库 */
export type ProductUnitPriceInsertByBasic = {
  unitPriceDbId: string; // 综合单价库目录ID
  ids: string[]; //	综合单价行ID
} & ProductUnitPriceQuery;
