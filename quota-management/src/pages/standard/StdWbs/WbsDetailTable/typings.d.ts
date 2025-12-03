/*
 * @Author: SHUANG
 * @Date: 2024-02-21 16:36:52
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-02-22 14:36:03
 * @Description:标准库-WBS库-明细
 */

/** WBS明细 查询 */
export type WbsDetailQuery = {
  wbsDirectoryId: string; //	无
};

/** WBS明细 数据项 */
export type WbsDetailItem = {
  showNumber: string; // WBS序号
  wbsCode: string; // WBS编码
  wbsName: string; // WBS名称
  wbsUnit: string; // WBS单位
  wbsComRule: string; // 指标数量计算规则
  wbsJobContent: string; // 标准工作内容
  indexItems: string; // 打标项1是0否
  taxRate: string; // 增值税率
};
