/*
 * @Author: SHUANG
 * @Date: 2024-04-17 15:00:06
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-18 14:10:22
 * @Description: 综合单价临时库
 */

import * as TYPES from './typings';
import { request } from 'umi';

/**
 * @Author: SHUANG
 * @Description: 查询综合单价临时库
 * @Date: 2024-04-17 15:10:54
 */
export async function tempUnitPriceQueryPageInfo(data: FETCH.Req) {
  return request<FETCH.Res<TYPES.TempUnitPriceItem>>('/product/temp/unitprice/queryPageInfo.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 接受
 * @Date: 2024-04-17 15:11:31
 */
export async function tempUnitPriceUpdateAcceptEnterDatabase(data: TYPES.TempUnitPriceAccepParams) {
  return request<FETCH.Res>('/product/temp/unitprice/updateAcceptEnterDatabase.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 拒绝
 * @Date: 2024-04-17 15:12:56
 */
export async function tempUnitPriceUpdateRejectEnterDatabase(data: TYPES.TempUnitPriceRejectParams) {
  return request<FETCH.Res>('/product/temp/unitprice/updateRejectEnterDatabase.action', {
    method: 'POST',
    data,
  });
}
