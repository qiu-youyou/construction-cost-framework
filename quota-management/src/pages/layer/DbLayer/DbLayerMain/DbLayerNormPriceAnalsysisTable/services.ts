/*
 * @Author: SHUANG
 * @Date: 2023-11-17 18:28:43
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-03-14 15:58:54
 * @Description: 全费用定额测算-定额明细-单价分析表
 */
import { request } from 'umi';
import { DbLayerNormFeeQuery } from '../DbLayerNormFeeTable/typings';

/** 使用综合单价 单价分析表字段 */
import { UnitPriceAnalysisItem } from '@/pages/standard/StdUnitPrice/UnitPriceDetailTable/UnitPriceAnalysisTable/typings';

export async function dbLayerNormPriceAnalysisQueryPageInfo(data: FETCH.Req<DbLayerNormFeeQuery>) {
  return request<FETCH.Res<UnitPriceAnalysisItem>>('/business/database/layer/analysis/queryPageInfo.action', {
    method: 'POST',
    data,
  });
}
