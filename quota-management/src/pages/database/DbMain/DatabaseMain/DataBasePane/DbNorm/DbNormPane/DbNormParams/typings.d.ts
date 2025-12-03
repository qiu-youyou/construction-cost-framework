/*
 * @Author: SHUANG
 * @Date: 2023-10-24 18:06:31
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-11-14 10:12:01
 * @Description: 企业定额维护-定额参数
 */

/** 查询定额参数需要的参数 */
export type DbNormParamsQuery = {
  chapterId: string; // 章节ID
  dbId: string; // 定额库ID
  normId: string; // 定额ID
};

/** 定额参数 数据项 */
export type DbNormParamsItem = DbNormParamsQuery & {
  paramsName: string; // 参数名
  paramsValue: string; // 参数值
  paramsLog: string; // 修改记录
  id: string; // 选中行id
  billSort: string;
};

/** 定额参数 新增空行参数 */
export type DbNormParamsSaveParams = DbNormParamsQuery & {
  currentId: string; // 选中行id
};
