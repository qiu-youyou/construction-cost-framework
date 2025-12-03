/*
 * @Author: SHUANG
 * @Date: 2023-11-10 15:06:43
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-11-10 15:11:49
 * @Description: 项目相关设计文档目录结构
 */

/** 项目相关设计文档目录结构 数据项 */
export type DocumentDirectoryItem = {
  directoryCode: string; // 目录编码
  directoryName: string; // 目录名称
  parentId: string; // 父节点ID
  billStatus: string; // 状态
  id: string; // id
  children?: DocumentDirectoryItem[]; // 子节点
};

/** 项目相关设计文档目录结构 保存参数 */
export type DocumentDirectorySaveParams = {
  directoryCode: string; // 目录编码
  directoryName: string; // 目录名称
};
