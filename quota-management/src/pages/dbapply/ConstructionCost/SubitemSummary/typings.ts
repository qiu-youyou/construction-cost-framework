/*
 * @Author: SHUANG
 * @Date: 2024-01-18 11:54:21
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-02-05 16:42:06
 * @Description: 工程造价-造价编制-分部分项汇总
 */

/** 工程造价-造价编制-分部分项汇总 查询 */
export type SubitemSummaryQuery = {
  projectId: string; // 项目id
  stageId: string; // 阶段id
};

/** 工程造价-造价编制-分部分项汇总 数据项 */
export type SubitemSummaryItem = {
  projectId: string; // 项目id
  showNumber: string; // 序号
  stageId: string; // 阶段ID
  subitemCode: string; // 分部分项编码
  subitemName: string; // 分部分项名称
  subitemConstructTotal: string; // 施工、安装合价
  subitemEquipmentTotal: string; // 主材、设备合价
  subitemTotal: string; // 合价
  id: string;
};
