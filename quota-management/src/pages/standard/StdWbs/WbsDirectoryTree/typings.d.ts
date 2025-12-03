/*
 * @Author: SHUANG
 * @Date: 2024-02-21 16:37:47
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-02-21 16:51:32
 * @Description: 标准库-WBS库-目录
 */
export type WbsDirectoryItem = {
  wbsDirectoryCode: string; // 目录编码
  wbsDirectoryName: string; // 目录名称
  parentId: string; // 上级ID
  id: string; // id
};
