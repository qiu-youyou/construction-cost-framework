/*
 * @Author: SHUANG
 * @Date: 2023-10-30 10:12:37
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-02-26 14:26:33
 * @Description: 取费修编-取费明细
 */
/** 取费明细查询参数 */
export interface DbFeeDetailQuery {
  dbId: string; // 定额库ID
  feeDirectoryId: string; // 取费目录名称
}

/** 取费明细 数据项 */
export type DbFeeDetailItem = {
  id: string; // 无
  dbId: string; // 定额库ID
  feeDirectoryId: string; // 取费目录ID
  feeCode: string; // 取费编码
  feeName: string; // 取费名称
  feeExpress: string; // 取费表达式
  feeRate: string; // 取费费率
  feeInterpretative: string; // 费用描述
  feeNote: string; // 备注关联费用类型
  feeRelational: string; // 关联费用类型
  feeTotalIsRow: string; // 合计行标识(使用Y进行标识)
  feeOnlyIsRow: string; // 只读行标识(使用Y进行标识)
  feeLog: string; // 材料修改记录
  feeCodeOld: string; // 取费编码(老的)
  feeNameOld: string; // 取费名称(老的)
  feeExpressOld: string; // 取费表达式(老的)
  feeInterpretativeOld: string; // 费用描述(老的)
  feeRelationalOld: string; // 关联费用类型(老的)
  feeRateOld: string; // 取费费率(老的)
  feeNoteOld: string; // 备注(老的)
  baseFeeRate: string; // 标准费率
};

/** 取费明细 新增空行 */
export type DbFeeDetailSaveParams = DbFeeDetailQuery;
