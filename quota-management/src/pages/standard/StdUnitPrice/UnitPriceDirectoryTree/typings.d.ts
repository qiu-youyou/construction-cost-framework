/*
 * @Author: SHUANG
 * @Date: 2023-11-15 10:37:08
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-03-22 11:03:07
 * @Description: 标准综合单价库 - 目录
 */

/** 标准综合单价库 - 目录 - 数据项 */
export type UnitPriceDirectoryItem = {
  billSort: string; // 顺序
  billStatus: string; // 状态
  unitPriceDbCode: string; // 目录编码
  unitPriceDbName: string; // 目录名称
  id: string; // 主键
  listNormDirectoryId: string;
  children?: UnitPriceDirectoryItem[];
  customId?: string;
};

/** 标准综合单价库 - 目录 - 保存 */
export type UnitPriceDirectorySave = {
  unitPriceDbName: string; // 目录全称
  id?: string;
};
