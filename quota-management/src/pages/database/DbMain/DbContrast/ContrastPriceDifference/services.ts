/*
 * @Author: SHUANG
 * @Date: 2023-11-08 15:00:28
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-11-17 09:38:03
 * @Description: 企业定额修编-价格差异对比
 */
import { request } from 'umi';
import * as TYPES from './typings';

/**
 * @Author: SHUANG
 * @Description: 价格差异对比 查询
 * @Date: 2023-11-08 15:19:37
 */
export async function dbNormQueryPriceDifference(data?: FETCH.Req<TYPES.DbNormPriceDifferenceQuery>) {
  return request<FETCH.Res<TYPES.DbNormPriceDifferenceItem>>(
    '/business/database/db/norm/queryPriceDifference.action',
    {
      method: 'POST',
      data,
    },
  );
}
