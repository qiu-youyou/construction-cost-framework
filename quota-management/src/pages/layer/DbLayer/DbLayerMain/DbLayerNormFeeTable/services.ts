/*
 * @Author: SHUANG
 * @Date: 2023-11-17 17:57:05
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-11-17 17:58:22
 * @Description: 全费用定额测算-定额明细-取费明细表
 */
import { request } from 'umi';
import * as TYPES from './typings';
import { DbFeeDetailItem } from '@/pages/database/DbFee/DbFeeDetailTable/typings';

/**
 * @Author: SHUANG
 * @Description: 全费用定额测算-定额明细-取费明细表 查询
 * @Date: 2023-11-17 17:57:17
 */
export async function dbLayerNormFeeQueryPageInfo(data: FETCH.Req<TYPES.DbLayerNormFeeQuery>) {
  return request<FETCH.Res<DbFeeDetailItem>>('/business/database/layer/fee/queryPageInfo.action', {
    method: 'POST',
    data,
  });
}
