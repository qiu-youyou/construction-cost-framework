/*
 * @Author: SHUANG
 * @Date: 2023-11-09 14:36:32
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-11-09 18:13:09
 * @Description: 标准库-次材市场价格库-明细
 */

/** 次材库明细 查询参数 */
export type SubsidiaryMatDetailQuery = {
  deviceMatDirectoryId: string; // 目录ID
};

/** 次材库明细 数据项 */
export type SubsidiaryMatDetailItem = {
  matCode: string; // 材料编号
  matName: string; // 材料名称
  matSpecify: string; // 材料规格
  matUnit: string; // 材料单位
  matSingleWeight: string; // 材料单重
  matNotTaxPrice: string; // 不含税单价
  matIncludeTaxPrice: string; // 含税价
  deviceMatDirectoryId: string; // 目录ID
  billSort?: string;
  id: string;
  dbId: string;
};

/** 次材库明细 从人材机插入 */
export type SubMatBatchInsertByRcj = {
  deviceMatDbId: string; // 人材机库ID
  classifyId: string; // 人材机目录ID
  deviceMatDirectoryId: string; // 目标目录ID
  currentId: string; // 选中行currentId 没有就不传
  billSort: string; // 选中行BillSort 没有就不传
  ids: string[]; // 勾选的rcjID
};
