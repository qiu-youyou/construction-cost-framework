/*
 * @Author: SHUANG
 * @Date: 2024-03-25 13:56:48
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-03-25 14:07:25
 * @Description: 工程造价-组时机械定义
 */

/** 工程造价-组时机械定义 查询 */
export type MultiformMechanicalQuery = {
  projectId: string; // 项目ID
  stageId: string; // 阶段ID
};

/** 工程造价-组时机械定义 数据项 */
export type MultiformMechanicalItem = {
  id: string; // 主键
  matCode: string; // 编码
  matName: string; // 名称
  matPrice: string; // 价格
  matUnit: string; // 单位
  projectId: string; // 项目ID
  stageId: string; // 阶段ID
  matLog: string; // 修改日志
};
