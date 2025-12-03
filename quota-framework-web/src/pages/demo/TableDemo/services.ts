/*
 * @Author: SHUANG
 * @Date: 2023-07-27 10:37:29
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-07-27 10:39:09
 * @Description:
 */
import { request } from 'umi';

export async function testQueryPageInfo(data?: FETCH.Req) {
  return request<FETCH.Res<any>>('/test/success.action', {
    method: 'POST',
    data,
  });
}

export async function testSave(data: any) {
  return request<FETCH.Res>('/test/success.action', {
    method: 'POST',
    data,
  });
}
