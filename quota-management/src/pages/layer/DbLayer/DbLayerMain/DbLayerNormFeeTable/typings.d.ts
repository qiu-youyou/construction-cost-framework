/*
 * @Author: SHUANG
 * @Date: 2023-11-17 17:57:05
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-11-17 17:59:27
 * @Description: 全费用定额测算-定额明细-取费明细表
 */

/** 查询参数 */
export type DbLayerNormFeeQuery = {
  dbId: string; // 定额库ID
  chapterId: string; // 章节ID
  layerId: string; // 层ID
  normId: string; // 定额ID
};
