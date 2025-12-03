/*
 * @Author: SHUANG
 * @Date: 2024-01-18 11:45:48
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-02-05 17:28:56
 * @Description: 工程造价-造价编制-WBS汇总
 */

/** 工程造价-造价编制-WBS汇总 查询 */
export type WbsSummaryQuery = {
  projectId: string; // 项目id
  stageId: string; // 阶段id
};

/** 工程造价-造价编制-WBS汇总 数据项 */
export type WbsSummaryItem = {
  projectId: string; // 无
  showNumber: string; // 显示编码
  stageId: string; // 无
  wbsCode: string; // WBS编码
  wbsName: string; // WBS名称
  wbsConstructTotal: string; // 施工、安装合价
  wbsEquipmentTotal: string; // 主材、设备合价
  wbsTotal: string; // 合价
  wbsUnit: string; // WBS单位
};
