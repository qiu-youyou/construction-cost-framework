/*
 * @Author: SHUANG
 * @Date: 2024-04-17 15:00:06
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-17 17:18:15
 * @Description: 综合单价临时库
 */

import * as TYPES from './typings';
import { request } from 'umi';

/**
 * @Author: SHUANG
 * @Description: 查询临时定额库
 * @Date: 2024-04-17 15:10:54
 */
export async function tempNormQueryPageInfo(data: FETCH.Req) {
  return request<FETCH.Res<TYPES.TempNormItem>>('/product/temp/norm/queryPageInfo.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 接受
 * @Date: 2024-04-17 15:11:31
 */
export async function tempNormUpdateAcceptEnterDatabase(data: TYPES.TempNormAcceptParams) {
  return request<FETCH.Res>('/product/temp/norm/updateAcceptEnterDatabase.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 拒绝
 * @Date: 2024-04-17 15:12:56
 */
export async function tempNormUpdateRejectEnterDatabase(data: TYPES.TempNormRejectParams) {
  return request<FETCH.Res>('/product/temp/norm/updateRejectEnterDatabase.action', {
    method: 'POST',
    data,
  });
}
