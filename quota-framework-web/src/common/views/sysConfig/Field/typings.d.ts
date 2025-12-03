/*
 * @Author: SHUANG
 * @Date: 2023-07-26 16:37:02
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-08-01 11:08:18
 * @Description:
 */

// 目录列表项
export type FieldClassListItem = {
  billSort: string; // 顺序
  billStatus: string; // 状态
  businessKey: string; // 业务key
  businessName: string; // 业务描述
  businessTable: string; // 表名
  id: string; // 主键
};

// 高级查询列表项
export type FieldQueryListItem = {
  billSort: string; //	顺序
  billStatus: string; //	状态
  businessId: string; //	目录ID
  fieldName: string; //	数据库字段名称
  fieldNameEn: string; //	显示字段名称(中文)
  fieldNumberRate: string; //	数值系数
  fieldType: string; //	字段类型(stirng,number….)
  id: string; //	主键
};

// 排序维护
export type FieldSortListItem = {
  billSort: string; // 顺序
  billStatus: string; // 状态
  businessId: string; // 目录ID
  fieldName: string; // 排序字段
  fieldNameEn: string; // 字段描述
  id: string; // 主键
  fieldNameView: string; // 前台传输的
};
