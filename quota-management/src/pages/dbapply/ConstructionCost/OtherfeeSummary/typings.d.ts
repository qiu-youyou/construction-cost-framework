/*
 * @Author: SHUANG
 * @Date: 2024-01-17 09:51:12
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-02-28 11:14:32
 * @Description: 工程造价-造价编制-其他费用汇总
 */

/**  其他费汇总 查询 */
export type OtherSummaryQuery = {
  projectId: string; // 项目ID
  stageId: string; // 阶段ID
};

/** 其他费汇总 数据项 */
export type OtherSummaryItem = {
  otherCode: string; // 其他费编码
  otherName: string; // 其他费名称
  otherExpress: string; // 其他费表达式
  otherIndexCode: string; // 其他费序号
  otherInterpretative: string; // 费用描述
  otherLog: string; // 其他费明细修改记录
  otherNote: string; // 备注
  otherOnlyIsRow: string; // 只读行
  otherRate: string; // 费率
  otherTotalIsRow: string; // 合计行
  otherTotal: string; // 金额
  projectId: string; // 无
  stageId: string; // 无
  id: string;
};
