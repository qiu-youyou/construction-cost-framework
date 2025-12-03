/** 查询条件 模型 */
export type QueryConditionItemType = {
  select: boolean; // 是否够训
  fieldName?: string; // ’字段名称’
  value?: string; // ’字段值’
  condition: string; // 条件
  keyword: 'and' | 'or'; // 关系
  numberRate?: number; // ’系数’
  filedType: string; // 字符串
};

/** 查询项目 */
export type QueryFieldItemType = {
  filedName: string;
  filedNameEn: string;
  filedNumberRate: number;
  filedType: string;
};
