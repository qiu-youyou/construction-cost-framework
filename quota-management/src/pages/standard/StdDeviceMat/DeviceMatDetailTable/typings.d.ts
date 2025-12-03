/*
 * @Author: SHUANG
 * @Date: 2023-11-09 11:36:27
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-11-09 13:51:28
 * @Description: 标准库-装置性材料价格库-明细
 */

/** 装置性材料价格库明细 查询参数 */
export type DeviceMatDetailQuery = {
  deviceMatDirectoryId: string; // 目录ID
};

/** 装置性材料价格库明细 数据项 */
export type DeviceMatDetailItem = {
  matCode: string; // 材料编号
  matName: string; // 材料名称
  matSpecify: string; // 材料规格
  matUnit: string; // 材料单位
  matSingleWeight: string; // 材料单重
  matNotTaxPrice: string; // 不含税单价
  matIncludeTaxPrice: string; // 含税价
  deviceMatDirectoryId: string; // 目录ID
  id: string;
};
