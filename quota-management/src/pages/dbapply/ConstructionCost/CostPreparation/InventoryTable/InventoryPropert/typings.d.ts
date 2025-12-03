/*
 * @Author: SHUANG
 * @Date: 2024-01-11 14:27:51
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-02-27 14:27:14
 * @Description: 工程造价-工程量清单编制-分部分项清单表 项目特征
 */

/** 分部分项清单 项目特征 查询参数 */
export type InventoryPropertQuery = {
  inventoryPriceId: string; // 清单ID
  projectId: string; // 工程ID
  stageId: string; // 产品ID
  txt?: string; // 文本
};

/** 分部分项清单 项目特征 数据项 */
export type InventoryPropertItem = {
  projectId: string; // 项目ID
  stageId: string; // 阶段ID
  inventoryPriceId: string; // 清单ID
  propertiesName: string; // 特征名称
  propertiesUnit: string; // 特征单位
  propertiesValue: string; // 特征值
};
