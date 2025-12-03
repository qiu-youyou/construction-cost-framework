/*
 * @Author: SHUANG
 * @Date: 2024-01-11 11:57:07
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-03 15:57:25
 * @Description: 工程造价-工程量清单编制-分部分项清单
 */

/** 工程造价-工程量清单编制-分部分项清单 查询 */
export type InventoryQuery = {
  projectId: string; // 工程ID
  stageId: string; // 产品ID
  parentId?: string; // 目录parentId
  directoryId?: string; // 目录ID
};

/** 工程造价-工程量清单编制-分部分项清单 数据项 */
export type InventoryItem = {
  id: string;
  parentId: string;
  inventoryCode: string; // 编号
  inventoryName: string; // 名称
  inventoryUnit: string; // 单位
  inventoryAmount: string; // 工程量
  inventoryEquipmentPrice: string; // 主材、设备单价
  inventoryConstructPrice: string; // 施工、安装单价
  inventoryEquipmentTotal: string; // 主材、设备合价
  inventoryConstructTotal: string; // 施工、安装合价
  inventoryCalcRule: string; // 清单计算规则
  inventoryProperty: string; // 清单项目特征描述
  wbsCode: string; // WBS编码
  wbsName: string; // WBS名称
  indexName: string; // 指标名称
  unitPriceCode: string; // 综合单价编号
  inventoryLog: string; // 修改记录
  billSort: string; // 单据排序
  projectId: string; // 工程ID
  stageId: string; // 阶段产品ID
  auditRemarks: string;
  auditFlag: 'Y' | 'N';
  children: InventoryItem[];
};

/** 工程造价-工程量清单编制-分部分项清单 关联 WBS、关联指标 */
export type InventoryCreateRelevancyParams = {
  relevancyType: 'wbs' | 'index'; // 写死
  projectId: string; // 工程ID
  stageId: string; // 阶段ID
  id: string; // 清单ID

  wbsCode?: string; // 取基础wbs表中的wbsCode
  wbsName?: string; // 取基础wbs表中的wbsName
  indexCode?: string; // 指标编码
  indexName?: string; // 指标名称
};

/** 工程造价-工程量清单编制-分部分项清单 从清单关联映射库到清单中批量新增 */
export type InventoryListSaveParams = {
  projectId: string; // 无
  stageId: string; // 无
  parentId: string; // 无
  billSort: string; // 无
  currentId: string; // 无
  listNormDirectoryId: string; // 无
  ids: string[]; //	无
};
