/*
 * @Author: SHUANG
 * @Date: 2023-11-09 10:58:39
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-11-09 13:59:15
 * @Description: 标准库-装置性材料价格库-目录
 */

/** 装置材料/次材目录 查询参数 */
export type DeviceMatDirectoryQuery = {
  deviceMatTypeCode: 'ZC' | 'CC'; // 目录类型(ZC[装置性材料价格库]、CC[次材市场价格库])
};

/** 装置材料/次材目录 数据项 */
export type DeviceMatDirectoryItem = {
  deviceMatDirectoryCode: string; // 目录编码
  deviceMatDirectoryName: string; // 目录全称
  deviceMatDirectorySimple: string; // 目录简称
  deviceMatDirectoryLog: string; // 修改记录
  id: string;
  children?: DeviceMatDirectoryItem[];
};

/** 装置材料/次材目录 保存参数 */
export type DeviceMatDirectorySaveParams = DeviceMatDirectoryQuery & {
  deviceMatDirectoryCode: string; // 目录编码
  deviceMatDirectorySimple: string; // 目录全称
  parentId: string; // 父节点ID
};
