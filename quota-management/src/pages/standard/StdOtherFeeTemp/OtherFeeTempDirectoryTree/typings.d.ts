/*
 * @Author: SHUANG
 * @Date: 2023-11-10 11:16:13
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-11-10 11:50:43
 * @Description: 标准库-其他费用模板-目录
 */

/**  标准库-其他费用模板-目录 查询参数 */
export type OtherFeeTempDirectoryQuery = {
  otherSumTypeCode: 'QT' | 'XMHZB'; // 目录类型(QT[其他费]、XMHZB[项目汇总表])
};

/**  标准库-其他费用模板-目录 数据项  */
export type OtherFeeTempDirectoryItem = {
  id: string; // 目录ID
  otherSumDirectoryCode: string; // 目录编码
  otherSumDirectoryName: string; // 目录全称
  otherSumDirectorySimple: string; // 目录简称
  otherSumDirectoryLog: string; // 修改记录
  otherSumDirectoryCodeOld: string; // 目录编码(老的)
  otherSumDirectoryNameOld: string; // 目录全称(老的)
  otherSumDirectorySimpleOld: string; // 目录简称(老的)
  otherSumTypeCode: string; // 目录类型(QT[其他费]、XMHZB[项目汇总表])
  children?: OtherFeeTempDirectoryItem[];
};

/** 标准库-其他费用模板-目录 保存参数 */
export type OtherFeeTempDirectorySaveParams = OtherFeeTempDirectoryQuery & {
  id: string; // 主键
  parentId: string; // 父节点ID
  otherSumDirectoryCode: string; // 目录编码
  otherSumDirectoryName: string; // 目录全称
  otherSumDirectorySimple: string; // 目录简称
};
