/*
 * @Author: SHUANG
 * @Date: 2024-01-17 09:51:12
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-02-28 15:56:52
 * @Description: 工程造价-造价编制-项目汇总
 */

/** 项目汇总 查询 */
export type ProjectSummaryQuery = {
  projectId: string; // 项目ID
  stageId: string; // 阶段ID
};

/** 项目汇总 数据项 */
export type ProjectSummaryItem = {
  id: string; // 主键
  projectId: string; // 项目ID
  stageId: string; // 阶段ID
  sumIndexCode: string; // 项目汇总序号
  sumCode: string; // 项目汇总编码
  sumName: string; // 项目汇总名称
  sumExpress: string; // 项目汇总表达式
  sumRate: string; // 费率
  sumInterpretative: string; // 费用描述
  sumNote: string; // 备注
  sumOnlyIsRow: string; // 只读行标识
  sumTotalIsRow: string; // 合计行标识
  sumIndexCodeOld: string; // 项目汇总序号（老的）
  sumCodeOld: string; // 项目汇总编码（老的）
  sumNameOld: string; // 项目汇总名称（老的）
  sumExpressOld: string; // 项目汇总表达式（老的）
  sumRateOld: string; // 费率（老的）
  sumLog: string; // 修改记录
  sumTotal: string; // 金额
};
