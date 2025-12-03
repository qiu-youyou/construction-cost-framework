/*
 * @Author: SHUANG
 * @Date: 2024-04-17 15:00:06
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-18 10:47:33
 * @Description: 综合单价临时库
 */

import * as TYPES from './typings';
import { request } from 'umi';

/**
 * @Author: SHUANG
 * @Description: 查询临时定额库
 * @Date: 2024-04-17 15:10:54
 */
export async function tempNormMatQueryPageInfo(data: FETCH.Req) {
  return request<FETCH.Res<TYPES.TempNormMatItem>>('/product/temp/norm/mat/queryPageInfo.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 接受
 * @Date: 2024-04-17 15:11:31
 */
export async function tempNormMatUpdateAcceptEnterDatabase(data: TYPES.TempNormMatAcceptParams) {
  return request<FETCH.Res>('/product/temp/norm/mat/updateAcceptEnterDatabase.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 拒绝
 * @Date: 2024-04-17 15:12:56
 */
export async function tempNormMatUpdateRejectEnterDatabase(data: TYPES.TempNormMatRejectParams) {
  return request<FETCH.Res>('/product/temp/norm/mat/updateRejectEnterDatabase.action', {
    method: 'POST',
    data,
  });
}
