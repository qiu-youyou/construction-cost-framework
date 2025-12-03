/*
 * @Author: SHUANG
 * @Date: 2024-03-27 15:58:37
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-03-27 16:00:42
 * @Description: 工程造价-工程量清单编制-分部分项清单表 查询历史项目设备价格
 */

export type HistoryDevPriceQuery = {
  inventoryNameLike: string; // 名称模糊查询字段
  inventoryUnitLike: string; // 单位模糊查询字段
};

export type HistoryDevPriceItem = {
  projectName: string; // 项目名称
  projectProvince: string; // 省份
  projectIndustry: string; // 参数-所属行业名称
  enrollDate: string; // 登记时间
  inventoryCode: string; // 编号
  inventoryName: string; // 名称
  inventoryUnit: string; // 单位
  inventoryEquipmentPrice: string; // 主材、设备单价
};
