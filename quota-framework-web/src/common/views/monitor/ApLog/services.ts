/*
 * @Author: SHUANG
 * @Date: 2023-07-24 17:38:11
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-07-26 11:23:20
 * @Description:
 */
import { request } from 'umi';
import * as TYPES from './typings';

/**
 * @Author: SHUANG
 * @Description: 接口维护查询
 * @Date: 2023-07-24 09:47:25
 */
export async function dataSwapLogQueryPageInfo(data?: FETCH.Req) {
  return request<FETCH.Res<TYPES.SwapLogListItem>>('/data/swap/log/queryPageInfo.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 接口维护查询内容
 * @Date: 2023-07-24 17:44:29
 */
export async function dataSwapLogQueryContentById(data: { id: string }) {
  return request<FETCH.Row<TYPES.SwapLogContent>>('/data/swap/log/queryContentById.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 接口维护修改备注
 * @Date: 2023-07-24 11:05:53
 */
export async function dataSwapLogUpdateMemoById(data: { id: string; memo: string }) {
  return request<FETCH.Res>('/data/swap/log/updateMemoById.action', {
    method: 'POST',
    data,
  });
}
