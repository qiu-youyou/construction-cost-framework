/*
 * @Author: SHUANG
 * @Date: 2023-11-17 15:59:55
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-11-17 16:03:17
 * @Description: 全费用定额测算 - 定额明细
 */
import { request } from 'umi';
import * as TYPES from './typings';

/**
 * @Author: SHUANG
 * @Description: 全费用定额测算 - 定额明细 查询
 * @Date: 2023-11-17 16:00:26
 */
export async function dbLayerNormQueryPageInfo(data: FETCH.Req<TYPES.DbLayerNormQuery>) {
  return request<FETCH.Res<TYPES.DbLayerNormItem>>('/business/database/layer/norm/queryPageInfo.action', {
    method: 'POST',
    data,
  });
}
