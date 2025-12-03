/*
 * @Author: SHUANG
 * @Date: 2024-03-21 10:44:32
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-03-21 10:59:03
 * @Description: 工程造价对比
 */

/** 工程造价对比 查询参数 */
export type DifferenceQuery = {
  beforeProjectId: string; // 先勾选的项目ID
  beforeStageId: string; // 先勾选的阶段ID
  afterProjectId: string; // 后勾选的项目ID
  afterStageId: string; // 后勾选的阶段ID
};

/** 工程造价对比 数据 */
export type DifferenceData = {
  total: number;
  current: string;
  source: string;
  list: any[];
};
