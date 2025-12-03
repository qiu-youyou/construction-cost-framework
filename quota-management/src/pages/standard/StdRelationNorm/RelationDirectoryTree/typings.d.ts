/*
 * @Author: SHUANG
 * @Date: 2023-11-06 09:59:45
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-11-06 10:03:51
 * @Description: 清单关联定额映射库 目录
 */

/**  清单关联定额映射库 目录 */
export type RelationDirectoryItem = {
  billSort: string; // 顺序
  billStatus: string; // 状态
  createDatetime: string; // 创建时间
  createMan: string; // 创建人
  createManId: string; // 创建人ID
  id: string; // 主键
  listNormRelatedName: string; // 目录名称
  updateDatetime: string; // 最后修改时间
  updateMan: string; // 最后修改人
  updateManId: string; // 最后修改人ID
};

/** 清单关联定额映射库 保存参数 */
export type RelationDirectorySaveParams = {
  id?: string; // 主键
  listNormRelatedName: string; //	映射库目录全称
};
