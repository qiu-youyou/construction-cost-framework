/*
 * @Author: SHUANG
 * @Date: 2023-11-06 10:27:57
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-11-07 14:22:02
 * @Description: 清单关联定额映射库 - 清单
 */

/** 清单关联定额映射库 清单 查询参数  */
export type RelationDetailQuery = {
  listNormDirectoryId: string; // 目录ID
};

/** 清单关联定额映射库 清单 数据项 */
export type RelationDetailItem = {
  billSort: string; //	顺序
  billStatus: string; //	状态
  createDatetime: string; //	创建时间
  createMan: string; //	创建人
  createManId: string; //	创建人ID
  detailCalcRule: string; //	计算规则
  detailCode: string; //	清单编码
  detailName: string; //	清单名称
  detailProperty: string; //	项目特征描述
  detailUnit: string; //	清单单位
  detailWork: string; //	工作内容
  id: string; //	主键ID
  parentId: string; //	父节点ID
  updateDatetime: string; //	最后修改时间
  updateMan: string; //	最后修改人
  updateManId: string; //	最后修改人ID
  listNormDirectoryId: string; // 目录ID
  children?: RelationDetailItem[];
};

/** 清单关联定额映射库 清单 成本信息系统分部分项目录 数据项 */
export type RelationSubItemByCostSystemItem = {
  message: string; // 提示信息
  rows: string; // 数据集合
  busType: string; // 业务类型
  fbfxName: string; // 分部分项目录名称
  id: string; // 主键
  indType: string; // 行业类别
  status: string; // 请求状态
  total: string; // 数据总条数
};

/** 清单关联定额映射库  清单 导入清单参数 */
export type RelationDetailImportParams = {
  listNormDirectoryId: string; // 目录ID
  branchDirectoryId: string; // 成本系统分部分项目录Id
};

/** 清单关联定额映射库 清单 查询项目特征参数 */
export type RelationDetailPropertiesQueryParams = {
  detailId: string; // 清单ID
  listNormDirectoryId: string; // 目录ID
};

/** 清单关联定额映射库 清单 项目特征 数据项 */
export type RelationDetailPropertiesItem = {
  billSort: string; // 顺序
  billStatus: string; // 状态
  createDatetime: string; // 创建时间
  createMan: string; // 创建人
  createManId: string; // 创建人ID
  id: string; // 主键
  propertiesName: string; // 特征名称
  propertiesUnit: string; // 特征单位
  propertiesValue: string; // 特征值
  updateDatetime: string; // 最后修改时间
  updateMan: string; // 最后修改人
  updateManId: string; // 最后修改人ID
};
