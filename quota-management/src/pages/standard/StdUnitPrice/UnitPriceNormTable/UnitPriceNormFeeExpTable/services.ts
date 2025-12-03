/*
 * @Author: SHUANG
 * @Date: 2023-11-16 18:15:53
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-11-16 18:38:21
 * @Description: 标准综合单价库 - 清单定额 - 取费表达式
 */
import { request } from 'umi';
import * as TYPES from './typings';

/**
 * @Author: SHUANG
 * @Description: 标准综合单价库 - 清单定额 - 取费表达式 查询
 * @Date: 2023-11-16 18:18:30
 */
export async function unitPriceExpFeeQueryPageInfo(data: FETCH.Req<TYPES.UnitPriceNormFeeExpQuery>) {
  return request<FETCH.Res<TYPES.UnitPriceNormFeeExpItem>>(
    '/business/database/standard/comprehensive/unit/price/exp/queryPageInfo.action',
    {
      method: 'POST',
      data,
    },
  );
}
