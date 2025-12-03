/*
 * @Author: SHUANG
 * @Date: 2024-02-04 16:49:05
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-02-05 14:21:16
 * @Description: 项目文档库-目录
 */

/** 项目文档库-目录 查询参数 */
export type ProjectDocDirectoryQuery = {
  projectId: string;
};

/** 项目文档库-目录 数据项 */
export type ProjectDocDirectoryItem = {
  directoryName: string; // 目录名称
  showNumber: string; // 序号
  projectId: string; // 项目ID
  parentId: string; // 父节点ID
  billStatus: string; // 状态
  id: string;
  children?: ProjectDocDirectoryItem[];
};

/** 项目文档库-目录 保存项 */
export type ProjectDocDirectorySaveParams = Partial<ProjectDocDirectoryItem>;
