/*
 * @Author: SHUANG
 * @Date: 2022-06-16 14:51:14
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2022-07-12 18:39:49
 * @Description:
 */

/** 字典类别项 */
export type DictClassItem = {
  className: string; // 字典类别名称
  classRemarks: string; // 字典类别描述
  classEn: string; // 字典类别英文名称
  billStatus: string; // 状态：3、启用、4禁用
  id: string;
};

/** 根据类别查询子项 */
export type DictItemListParams = { businessId: string };

/** 字典项 项 */
export type DictItemItem = {
  billStatus: string; // 状态：3、启用、4禁用
  businessId: string; // 主表业务ID
  itemName: string; // 字典项名称
  itemCode: string; // 字典项编码
  itemRemarks: string; // 字典项描述
  id: string;
};

/** 新增修改字典类别 */
export type DictClassAction = {
  id?: string; // 无 为新增
  className: string; //	字典类别名称
  classEn: string; //	字典类别英文名称
  classRemark?: string; // 字典类别描述
};

/** 新增修改字典项 */
export type DictItemAction = {
  id?: string; // 无 为新增
  businessId: string; // 字典类别ID
  itemName: string; // 字典项名称
  itemCode?: string; // 字典项编码
  itemRemarks?: string; // 字典项描述
};
