/*
 * @Author: SHUANG
 * @Date: 2024-04-10 15:41:24
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-23 14:50:20
 * @Description: 工程造价-运保杂费计算 运杂费用
 */

import { request } from 'umi';
import * as TYPES from './typings';

/**
 * @Author: SHUANG
 * @Description: 工程造价-运保杂费计算 运杂费用 查询
 * @Date: 2024-04-10 15:41:39
 */
export async function transportQueryPageInfo(data: FETCH.Req<TYPES.TransportQuery>) {
  return request<FETCH.Res<TYPES.TransportItem>>('/product/transport/queryPageInfo.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 工程造价-运保杂费计算 运杂费用 新增空行
 * @Date: 2024-04-10 17:01:48
 */
export async function transportSaveBlankRow(data: TYPES.TransportQuery) {
  return request<FETCH.Res>('/product/transport/saveBlankRow.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 工程造价-运保杂费计算 运杂费用 更新行
 * @Date: 2024-04-10 17:04:51
 */
export async function transportUpdateRow(data: FETCH.CellEditReq, params?: TYPES.TransportQuery) {
  return request<FETCH.Res>('/product/transport/updateRow.action', {
    method: 'POST',
    data: { ...data, ...params },
  });
}

/**
 * @Author: SHUANG
 * @Description: 工程造价-运保杂费计算 运杂费用 删除行
 * @Date: 2024-04-10 17:05:33
 */
export async function transportDeleteByIds(data: FETCH.UpStatus) {
  return request<FETCH.Res>('/product/transport/deleteByIds.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 工程造价-运保杂费计算 运杂费用 重排
 * @Date: 2024-04-10 17:07:38
 */
export async function transportSortSwap(data: FETCH.Req, current?: TYPES.TransportQuery) {
  const stageId = current?.stageId || '';
  const projectId = current?.projectId || '';
  const finalParams = { ids: [data?.arg1, data?.arg2], projectId, stageId };
  return request<FETCH.Res>('/product/transport/sortSwap.action', {
    method: 'POST',
    data: finalParams,
  });
}

/**
 * @Author: SHUANG
 * @Description: 工程造价-运保杂费计算 运杂费用 复制粘贴
 * @Date: 2024-04-10 17:10:16
 */
export async function transportCopyByIds(data: FETCH.Paste, current?: Partial<TYPES.TransportItem>) {
  const stageId = current?.stageId || '';
  const projectId = current?.projectId || '';
  const finalParams = { ...data, projectId, stageId };
  return request<FETCH.Res>('/product/transport/copyByIds.action', {
    method: 'POST',
    data: finalParams,
  });
}

/**
 * @Author: SHUANG
 * @Description: 工程造价-运保杂费计算 运杂费用 手动计算
 * @Date: 2024-04-11 10:23:01
 */
// export async function transportDeleteByIds(data: FETCH.UpStatus) {
//   return request<FETCH.Res>('/product/transport/deleteByIds.action', {
//     method: 'POST',
//     data,
//   });
// }
