/*
 * @Author: SHUANG
 * @Date: 2023-11-14 15:54:32
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-11-14 17:50:47
 * @Description: 人材机明细重构（材料关联关系设置） - 人材机明细
 */

/** 人材机明细 查询参数 */
export type MatSubsidiaryContentQuery = {
  subsidiaryId: string; // 次材id
};

/** 人材机明细 数据项目 */
export type MatSubsidiaryContentItem = {
  dbId: string; // 定额库ID
  classifyId: string; // 人材机目录id
  matId: string; // 人材机ID
  deviceMatDirectoryId: string; // 次材目录ID
  subsidiaryId: string; // 次材id
  dbCode: string; // 库编码
  dbName: string; // 库全称
  dbSimple: string; // 库简称
  matCode: string; // 材料编号
  matName: string; // 材料名称
  matUnit: string; // 材料单位
  billSort: string;
  id: string;
};

/** 人材机明细 保存选择人材机 */
export type MatSubsidiaryContentSaveMat = {
  ids: string[]; // 选择的人材机ids
  dbId: string; // 选择的人材机库id
  classifyId: string; // 选择的人材机目录id
  deviceMatDirectoryId: string; // 次材目录id
  subsidiaryId: string; // 次材id
  currentId: string; // 当前行id
  billSort: string; //		排序
};
