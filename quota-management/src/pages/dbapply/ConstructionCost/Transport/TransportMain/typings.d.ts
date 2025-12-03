/*
 * @Author: SHUANG
 * @Date: 2024-04-10 15:38:36
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-10 15:43:10
 * @Description: 工程造价-运保杂费计算 运杂费用
 */

/** 工程造价-运保杂费计算 运杂费用 查询 */
export type TransportQuery = {
  projectId: string; // 工程ID
  stageId: string; // 阶段ID
};

/** 工程造价-运保杂费计算 运杂费用 数据项 */
export type TransportItem = {
  changeLog: string; // 修改记录
  projectId: string; // 项目ID
  stageId: string; // 阶段Id
  traPrice: number; // 运杂费除税
  traPriceTax: number; // 运杂费含税
  traTaxRate: number; // 税率
  id: string; // 主键
};
