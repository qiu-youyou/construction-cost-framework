/*
 * @Author: SHUANG
 * @Date: 2023-11-10 11:31:25
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-11-10 11:43:04
 * @Description: 标准库-其他费用模板-明细
 */

/** 标准库-其他费用模板-明细 查询参数 */
export type OtherFeeTempDetailQuery = {
  otherSumDirectoryId: string; // 目录ID
  otherSumDirectoryName?: string; // 目录名称
};

/** 标准库-其他费用模板-明细 数据项 */
export type OtherFeeTempDetailItem = {
  parentId: string; // 预留，暂时不做树结构
  otherSumDirectoryId: string; // 目录ID
  otherSumDirectoryName: string; // 目录名称
  otherIndexCode: string; // 其他费序号
  otherCode: string; // 其他费编码
  otherName: string; // 其他费名称
  otherExpress: string; // 其他费表达式
  otherRate: string; // 费率
  otherInterpretative: string; // 费用描述
  otherNote: string; // 备注
  otherOnlyIsRow: string; // 只读行标识
  otherTotalIsRow: string; // 合计行标识
  otherIndexCodeOld: string; // 其他费序号（老的）
  otherCodeOld: string; // 其他费编码（老的）
  otherNameOld: string; // 其他费名称（老的）
  otherExpressOld: string; // 其他费表达式（老的）
  otherRateOld: string; // 费率（老的）
  otherInterpretativeOld: string; // 费用描述（老的）
  otherNoteOld: string; // 备注（老的）
  id: string;
};
