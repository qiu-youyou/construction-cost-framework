/*
 * @Author: SHUANG
 * @Date: 2023-11-13 17:06:25
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-11-14 11:22:37
 * @Description: 清单项目特征与定额参数特征映射库
 */

/** 清单项目特征与定额参数特征映射库 数据项 */
export type PropertiesParamsItem = {
  billSort: string; // 顺序
  billStatus: string; // 状态
  createDatetime: string; // 创建时间
  createMan: string; // 创建人
  createManId: string; // 创建人ID
  id: string; // 主键
  paramsCode: string; // 无
  paramsName: string; // 定额参数
  propertiesCode: string; // 无
  propertiesName: string; // 清单参数
  relateNote: string; // 备注
  updateDatetime: string; // 最后修改时间
  updateMan: string; // 最后修改人
  updateManId: string; // 最后修改人ID
};

/** 清单项目特征与定额参数特征映射库 保存参数 */
export type PropertiesParamsSaveParams = {
  propertiesName?: string; // 清单特征名称
  paramsName?: string; // 定额参数名称
  currentId: string; // 当前选中行
  billSort: string; // 当前选中行billSort
};

/** 清单项目特征与定额参数特征映射库 同步清单特征 数据项 */
export type PropertiesParamsSyncBillItem = {
  createDatetime: string; // 创建时间
  createMan: string; // 创建人
  createManId: string; // 创建人ID
  directoryCode: string; // 目录编码
  directoryName: string; // 目录名称
  id: string; // id
  parentId: string; // 父节点ID
  children?: PropertiesParamsSyncBillItem[];
};

/** 清单项目特征与定额参数特征映射库 同步定额参数 数据项 */
export type PropertiesParamsNormParamsItem = {
  paramsCode: string; // 序号
  paramsName: string; // 定额参数值
};
