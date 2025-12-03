/*
 * @Author: SHUANG
 * @Date: 2024-01-10 17:05:57
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-02-21 09:26:04
 * @Description: 工程造价-工程量清单编制-分部分项目录
 */

/** 工程造价-工程量清单编制-分部分项目录 查询 */
export type InventoryDirectoryQuery = {
  projectId: string; // 工程ID
  stageId: string; // 产品ID
};

/** 工程造价-工程量清单编制-分部分项目录 数据项 */
export type InventoryDirectoryItem = {
  inventoryCode: string; // 编号
  inventoryName: string; // 名称
  showNumber: string; // 序号
  projectId: string; // 工程ID
  stageId: string; // 阶段ID
  parentId?: string; // 父级ID
  id: string; // ID
};
