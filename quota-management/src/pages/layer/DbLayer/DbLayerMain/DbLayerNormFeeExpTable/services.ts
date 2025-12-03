/*
 * @Author: SHUANG
 * @Date: 2023-11-17 17:57:05
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-11-17 18:44:48
 * @Description: 全费用定额测算-定额明细-取费明细表
 */
import { UnitPriceNormFeeExpItem } from '@/pages/standard/StdUnitPrice/UnitPriceNormTable/UnitPriceNormFeeExpTable/typings';
import { request } from 'umi';

/**
 * @Author: SHUANG
 * @Description: 全费用定额测算-定额明细-取费明细表 查询
 * @Date: 2023-11-17 17:57:17
 */
export async function dbLayerNormFeeExpQueryPageInfo(data: FETCH.Req<{ dbId: string; normId: string }>) {
  return request<FETCH.Res<UnitPriceNormFeeExpItem>>('/business/database/layer/exp/queryPageInfo.action', {
    method: 'POST',
    data,
  });
}
