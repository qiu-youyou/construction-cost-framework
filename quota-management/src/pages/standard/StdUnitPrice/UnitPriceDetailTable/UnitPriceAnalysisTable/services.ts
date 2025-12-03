/*
 * @Author: SHUANG
 * @Date: 2023-11-15 18:35:06
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-11-15 18:38:37
 * @Description: 标准综合单价库 - 清单明细 - 综合单价分析表
 */
import { request } from 'umi';
import * as TYPES from './typings';

/**
 * @Author: SHUANG
 * @Description: 查询综合单价分析表
 * @Date: 2023-11-15 18:38:35
 */
export async function unitPriceAnalysisQueryPageInfo(data: TYPES.UnitPriceAnalysisQuery) {
  return request<FETCH.Res<TYPES.UnitPriceAnalysisItem>>(
    '/business/database/standard/comprehensive/unit/price/analysis/queryPageInfo.action',
    {
      method: 'POST',
      data,
    },
  );
}
