/*
 * @Author: SHUANG
 * @Date: 2023-11-15 18:35:00
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-11-15 18:36:28
 * @Description: 标准综合单价库 - 清单明细 - 综合单价分析表
 */

/** 清单明细 - 综合单价分析表 - 查询参数  */
export type UnitPriceAnalysisQuery = {
  unitPriceDbId: string; // 映射库目录ID
  unitPriceId: string; // 清单ID
};

/** 清单明细 - 综合单价分析表 - 数据项 */
export type UnitPriceAnalysisItem = {
  unitAnalysisCode: string; // 编号
  unitAnalysisName: string; // 名称及规格
  unitAnalysisPriceTotal: string; // 合价
  unitAnalysisAmount: string; // 数量
  unitAnalysisPrice: string; // 单价
  unitAnalysisUnit: string; // 单位
};
