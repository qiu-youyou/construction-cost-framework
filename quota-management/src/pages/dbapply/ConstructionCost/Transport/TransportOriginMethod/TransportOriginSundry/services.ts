/*
 * @Author: SHUANG
 * @Date: 2024-04-22 11:32:24
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-22 14:07:03
 * @Description: 工程造价-运保杂费计算 来源地 杂费
 */
import { request } from 'umi';
import { TransportOriginSundryItem, TransportOriginOtherQuery } from '../typings';

/**
 * @Author: SHUANG
 * @Description: 杂费-查询
 * @Date: 2024-04-22 11:36:47
 */
export async function transportOriginSundryQueryPageInfo(data: FETCH.Req<TransportOriginOtherQuery>) {
  return request<FETCH.Res<TransportOriginSundryItem>>(
    '/product/transport/origin/sundry/queryPageInfo.action',
    {
      method: 'POST',
      data,
    },
  );
}

/**
 * @Author: SHUANG
 * @Description: 杂费-新增行
 * @Date: 2024-04-22 11:38:16
 */
export async function transportOriginSundrySaveBlankRow(data: TransportOriginOtherQuery) {
  return request<FETCH.Res>('/product/transport/origin/sundry/saveBlankRow.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 杂费-更新行
 * @Date: 2024-04-22 11:39:02
 */
export async function transportOriginSundryUpdateRow(
  data: FETCH.CellEditReq,
  params?: TransportOriginOtherQuery,
) {
  return request<FETCH.Res>('/product/transport/origin/sundry/updateRow.action', {
    method: 'POST',
    data: { ...data, ...params },
  });
}

/**
 * @Author: SHUANG
 * @Description: 杂费-删除
 * @Date: 2024-04-22 11:39:38
 */
export async function transportOriginSundryDeleteByIds(data: FETCH.UpStatus) {
  return request<FETCH.Res>('/product/transport/origin/sundry/deleteByIds.action', {
    method: 'POST',
    data,
  });
}
