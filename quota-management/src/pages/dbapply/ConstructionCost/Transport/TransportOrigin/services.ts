/*
 * @Author: SHUANG
 * @Date: 2024-04-11 10:55:43
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-23 17:11:48
 * @Description: 工程造价-运保杂费计算 来源地
 */
import { request } from 'umi';
import * as TYPES from './typings';

/**
 * @Author: SHUANG
 * @Description: 运杂费-来源地-查询
 * @Date: 2024-04-11 10:56:57
 */
export async function transportOriginQueryPageInfo(data: FETCH.Req<TYPES.TransportOriginQuery>) {
  return request<FETCH.Res<TYPES.TransportOriginItem>>('/product/transport/origin/queryPageInfo.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 运杂费-来源地-新增行
 * @Date: 2024-04-11 14:16:52
 */
export async function transportOriginSaveBlankRow(data: TYPES.TransportOriginQuery) {
  return request<FETCH.Res>('/product/transport/origin/saveBlankRow.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 运杂费-来源地-更新行
 * @Date: 2024-04-11 14:17:50
 */
export async function transportOriginUpdateRow(data: FETCH.CellEditReq, params?: TYPES.TransportOriginQuery) {
  return request<FETCH.Res>('/product/transport/origin/updateRow.action', {
    method: 'POST',
    data: { ...data, ...params },
  });
}

/**
 * @Author: SHUANG
 * @Description: 运杂费-来源地-删除
 * @Date: 2024-04-11 14:19:30
 */
export async function transportOriginDeleteByIds(data: FETCH.UpStatus) {
  return request<FETCH.Res>('/product/transport/origin/deleteByIds.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 运杂费-来源地-排序
 * @Date: 2024-04-15 15:57:31
 */
export async function transportOriginSortSwap(data: FETCH.Req, current?: TYPES.TransportOriginQuery) {
  const traId = current?.traId || '';
  const stageId = current?.stageId || '';
  const projectId = current?.projectId || '';
  const finalParams = { ids: [data?.arg1, data?.arg2], projectId, stageId, traId };

  return request<FETCH.Res>('/product/transport/origin/sortSwap.action', {
    method: 'POST',
    data: finalParams,
  });
}

/**
 * @Author: SHUANG
 * @Description: 运杂费-来源地-复制粘贴
 * @Date: 2024-04-15 15:59:39
 */
export async function transportOriginCopyByIds(
  data: FETCH.Paste,
  current?: Partial<TYPES.TransportOriginItem>,
  sele?: TYPES.TransportOriginItem[],
) {
  const traId = sele?.[0]?.traId;

  const currentTraId = current?.traId || '';
  const stageId = current?.stageId || '';
  const projectId = current?.projectId || '';

  const finalParams = { ...data, projectId, stageId, traId, currentTraId };

  return request<FETCH.Res>('/product/transport/origin/copyByIds.action', {
    method: 'POST',
    data: finalParams,
  });
}
