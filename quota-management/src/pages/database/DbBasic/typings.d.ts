/*
 * @Author: SHUANG
 * @Date: 2024-02-29 11:32:15
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-03-04 15:56:18
 * @Description: 基础企业定额
 */

/** 模块基础企业定额维护列表 数据项 */
export type BasicDatabaseDbItem = {
  processInstanceId: string; // 流程实例ID
  processDefinitionId: string; // 流程部署ID
  diagramStatus: string; // 流程状态
  describe: string; // 描述
  dbId: string; // 定额库ID
  dbCode: string; // 定额库编码
  dbName: string; // 定额库名称
  id: string;
};

/** 选择定额查询 参数 */
export type BasicDatabaseDbNotExistsNormQuery = {
  dbId: string; // 无
  businessId: string; // 无
  chapterId: string; // 无
};

/** 选择人材机，机械，混凝土查询 参数 */
export type BasicDatabaseDbNotExistsMatQuery = {
  dbId: string; // 无
  classifyId: string; // 无
  businessId: string[]; // 无
};

export type BasicDatabaseDbSyncInfoJson = {
  dbId: string;
  businessId: string;
  copyIds: string[];
};

/** 同步定额,人材机，机械台班，混凝土 参数 */
export type BasicDatabaseDbSyncParams = {
  insertNormInformation?: string; // 批量新增定额信息
  insertMachineInformation?: string; // 批量新增机械台班信息
  insertConcreteInformation?: string; // 批量新增混凝土信息
  insertRcjInformation?: string; // 批量新增人材机信息
};

/** 查询定额明细需要的参数 */
export type DbBasicNormQuery = {
  businessId: string; // 主表ID
};
