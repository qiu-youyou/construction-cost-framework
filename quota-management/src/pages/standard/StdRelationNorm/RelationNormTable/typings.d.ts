/*
 * @Author: SHUANG
 * @Date: 2023-11-06 11:24:06
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-11-07 17:55:30
 * @Description: 清单关联定额映射库 - 清单 - 定额
 */

/** 清单关联定额映射库 - 清单 -定额 查询参数  */
export type RelationNormQuery = {
  detailId: string; // 清单ID
  listNormDirectoryId: string; // 目录id
};

/** 清单关联定额映射库 - 清单 - 定额 数据项 */
export type RelationNormItem = {
  billSort: string; // 顺序
  billStatus: string; // 状态
  chapterId: string; // 定额章节ID
  createDatetime: string; // 创建时间
  dbId: string; // 定额库ID
  detailId: string; // 清单ID
  id: string; // 主键
  listNormDirectoryId: string; // 目录ID
  normCode: string; // 定额号
  normId: string; // 定额ID
  normMacPrice: string; // 定额机械价格
  normManPrice: string; // 定额人工价格
  normMatPrice: string; // 定额材料价格
  normName: string; // 定额名称
  completeNormName: string; // 定额名称参数
  normPrice: string; // 定额单价
  normUnit: string; // 定额单位
  updateDatetime: string; // 最后修改时间
  status: string; // 请求状态
};

/** 清单关联定额映射库 - 清单 - 定额 保存 参数 */
export type RelationNormSaveParams = {
  normIds: string[]; // 定额ID集合
  detailId: string; // 清单ID
  listNormDirectoryId: string; // 目录id
  dbId: string; // 定额库id
};
